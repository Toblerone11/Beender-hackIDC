import json
from pprint import pprint
import scipy.cluster.hierarchy as hcluster
import numpy as np
import matplotlib.pyplot as plt
import os

LAT_FIELD = "Lat"
LNG_FIELD = "Lon"
THRESHOLD = 0.001

DATE_FIELD = "Date"
TIME_FIELD = "Time"

ID_FIELD = "id"
PLACE_NAME_FIELD = "PlaceName"
PLACE_CATEGORY_FIELD = "PlaceCategory"
PLACE_ADDRESS_FIELD = "PlaceAddress"
PLACE_WEBSITE_FIELD = "PlaceWebsite"
PLACE_DESC_FIELD = "PlaceDescription"
PLACE_IMAGE_FIELD = "PlaceImage"
PLACE_LAT_FIELD = "PlaceLat"
PLACE_LON_FIELD = "PlaceLon"


def prepare_data(meta_list):
    return np.array([[m[LAT_FIELD], m[LNG_FIELD]] for m in meta_list])

def cluster_metas(meta_list, plot=False):
    data = prepare_data(meta_list)
    clusters = hcluster.fclusterdata(data, THRESHOLD, criterion="distance")
    for c in set(clusters):
        for i in range(len(data)):
            if clusters[i] == c:
                print "%s,%s" % tuple(data[i])
        print ''
    if plot:
        plot_clusters(data, clusters)
    
    return clusters

def plot_clusters(data, clusters):
    plt.scatter(*np.transpose(data), c=clusters)
    plt.axis("equal")
    title = "threshold: %f, number of clusters: %d" % (THRESHOLD, len(set(clusters)))
    plt.title(title)
    plt.show()

def sort_by_time(meta_list):
    data = []
    for meta in meta_list:
        iid = meta[ID_FIELD]
        datetime = tuple(meta[DATE_FIELD].split(":") + meta[TIME_FIELD].split(":"))
        data.append((iid, datetime))

    for i in range(len(data[0][1])):
        data.sort(key=lambda x: x[1][-i])
    
    return [data[i][0] for i in range(len(data))]

def meta_list_to_dict(meta_list):
    return {meta[ID_FIELD] : meta for meta in meta_list}



def generate_metas_by_days(meta_list):
    meta_dict = meta_list_to_dict(meta_list)
    sorted_meta_names = sort_by_time(meta_dict.values())
    first_meta = sorted_meta_names[0]
    prev_day = meta_dict[first_meta][DATE_FIELD][-2:]
    metas = []
    for name in sorted_meta_names:
        meta = meta_dict[name]
        day = meta[DATE_FIELD][-2:]
        if day != prev_day:
            yield metas
            metas = []

        metas.append(meta)
        prev_day = day
    
    yield metas


def generate_metas_by_place(meta_list):
    prev_place = meta_list[0][PLACE_NAME_FIELD]
    metas = []
    for meta in meta_list:
        place = meta[PLACE_NAME_FIELD]
        if place != prev_place:
            yield metas
            metas = []
        
        metas.append(meta)
        prev_place = place
    
    yield metas

def create_timeline_obj(meta_list):
    timeline = {}
    timeline["days"] = []
    timeline["meanLon"] = sum([x[PLACE_LON_FIELD]  for x in meta_list]) / float(len(meta_list))
    timeline["meanLat"] = sum([x[PLACE_LAT_FIELD] for x in meta_list]) / float(len(meta_list))
    day_index = 1
    for day_metas in generate_metas_by_days(meta_list):
        day_obj = {}
        day_obj["day_index"] = day_index
        # day_obj["day_length"] = 10
        places = []
        for place_metas in generate_metas_by_place(day_metas):
            place_obj = {}
            place_obj["category"] = place_metas[0][PLACE_CATEGORY_FIELD]
            place_obj["lon"] = place_metas[0][PLACE_LON_FIELD]
            place_obj["lat"] = place_metas[0][PLACE_LAT_FIELD]
            place_obj["name"] = place_metas[0][PLACE_NAME_FIELD]
            place_obj["address"] = place_metas[0][PLACE_ADDRESS_FIELD]
            place_obj["description"] = place_metas[0][PLACE_DESC_FIELD]
            place_obj["website"] = place_metas[0][PLACE_WEBSITE_FIELD]
            place_obj["image"] = place_metas[0][PLACE_IMAGE_FIELD]
            place_obj["start_time"] = place_metas[0][TIME_FIELD]
            place_obj["end_time"] = place_metas[-1][TIME_FIELD]
            places.append(place_obj)

        day_obj["places"] = places
        timeline["days"].append(day_obj)
        day_index += 1
    
    return timeline

if __name__ == "__main__":
    in_dir = "image_meta_data"
    out_dir = "timelines"

    for meta_file in os.listdir(in_dir):
        print meta_file
        filepath = in_dir + os.sep + meta_file
        meta_list = None
        with open(filepath, 'r') as metas_f:
            meta_list = json.load(metas_f)
        
        timeline_obj = create_timeline_obj(meta_list)
        # pprint(timeline_obj)
        out_filepath = out_dir + os.sep + "timeline_" + meta_file
        with open(out_filepath, 'w') as timeline_f:
            json.dump(timeline_obj, timeline_f)


    # # clusters = cluster_metas(meta_list, plot=False)
    # time_sorted_images = sort_by_time(meta_list)
    # meta_dict = meta_list_to_dict(meta_list)

    # prev_place = ""
    # for img in time_sorted_images:
    #     place = meta_dict[img][PLACE_FIELD]
    #     if place != prev_place:
    #         print ''

    #     print "%s\t%s\t%s\t%s" % (img, place, meta_dict[img][DATE_FIELD], meta_dict[img][TIME_FIELD])
    #     prev_place = place

    # cluster_metas(meta_list, plot=True)







