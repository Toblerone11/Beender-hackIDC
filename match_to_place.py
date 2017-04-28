import foursquare
import sys
from pprint import pprint
import json
import os
# from googleplaces import GooglePlaces, types, lang
import urllib
import requests

def find_place(client,lat, lon):
    website = ""
    address = ""
    description = ""
    result = client.venues.search(params={"ll": str(lat)+","+str(lon),"limit" :1})
    name = result["venues"][0]["name"]
    location_lat = result["venues"][0]["location"]["lat"]
    location_lon = result["venues"][0]["location"]["lng"]
    category = result["venues"][0]["categories"][0]["name"]
    if "formattedAddress" in result["venues"][0]["location"]:
        address = " ".join(result["venues"][0]["location"]["formattedAddress"])

    if "url" in result["venues"][0]:
        website = result["venues"][0]["url"]

    if "description" in result["venues"][0]:
        description = result["venues"][0]["description"]


    API_KEY = "AIzaSyAY_jxtdTiaazLKa25aPIxIt0iseexokvI"
    URL_PATT = "https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&location={lng},{lat}&key={key}"

    def search_place(lng, lat, name):
        url = URL_PATT.format(key=API_KEY, lng=lng, lat=lat, query=name.encode("utf8").split("(")[0].strip())
        response = requests.get(url)
        return response.json()

    result_1 = search_place(location_lon, location_lat, name)
    if address == "":
        address = result_1["results"][0]["formatted_address"]

    # photo_reference = result_1["results"][0]["photos"][0]["photo_reference"]

    api_key = "AIzaSyCo5XDOpitttqGTflMxu6RPXVOwqFCjc1M"
    query = name.encode("utf8").split("(")[0].strip()
    service_url = 'https://kgsearch.googleapis.com/v1/entities:search'
    params = {
        'query': query,
        'limit': 1,
        'indent': True,
        'types' : "Place",
        'key': api_key,
    }
    url = service_url + '?' + urllib.urlencode(params)
    response = json.loads(urllib.urlopen(url).read())

    if response["itemListElement"] != [] and "detailedDescription" in response['itemListElement'][0]["result"]:
        if website =="" and "url" in response['itemListElement'][0]["result"]["detailedDescription"]:
            website = response['itemListElement'][0]["result"]["detailedDescription"]["url"]
        if description =="" and "articleBody" in response['itemListElement'][0]["result"]["detailedDescription"]:
            description = response['itemListElement'][0]["result"]["detailedDescription"]["articleBody"]

    service_url = "https://commons.wikimedia.org/w/api.php"
    params = {
        'action': "query",
        'generator': "geosearch",
        'ggsprimary': "all",
        'ggsnamespace': 6,
        "ggsradius" : 500,
        "ggscoord" : str(location_lat) + "|" + str(location_lon),
        "ggslimit" : 1,
        "prop" : "imageinfo",
        "iilimit" : 1,
        "iiprop": "url",
        "iiurlwidth" : 200,
        "iiurlheight" : 200,
        "format" : "json"
    }

    url = service_url + '?' + urllib.urlencode(params)

    response = json.loads(urllib.urlopen(url).read())
    image = ""
    if "query" in response:
        image = response["query"]["pages"][response["query"]["pages"].keys()[0]]["imageinfo"][0]["thumburl"]

    return [name, location_lat, location_lon, category, website, address,description, image]



if __name__ == '__main__':
    if len(sys.argv) < 2:
        print 'Specify directory path'
        exit()
    root_directory = sys.argv[1]
    client = foursquare.Foursquare(client_id='GDXS4XQA3DGHZ4SJ521035QP4NDSXPHDE0RRQAL5PNGNDSGY',
                                   client_secret='OPWUSTFKWXVR2IVPSI2WW40PF1SBK3S3SMYD40LBMGE4IRWD')

    for file in os.listdir(root_directory):
        if os.path.splitext(file)[1].lower() in ('.json', '.json') and file.startswith("metadata"):
            full_path = os.path.join(root_directory, file)
            file_obj = open(full_path, "r")
            metadatas = json.load(file_obj)
            for meta in metadatas:
                name, location_lat, location_lon, category, website, address,description, image = find_place(client, meta["Lat"], meta["Lon"])
                meta["PlaceName"] = name
                meta["PlaceLat"] = location_lat
                meta["PlaceLon"] = location_lon
                meta["PlaceCategory"] = category
                meta["PlaceWebsite"] = website
                meta["PlaceAddress"] = address
                meta["PlaceDescription"] = description
                meta["PlaceImage"] = image


            # print (len(places_datas))
            f = open("places" + file, "w")
            json.dump(metadatas, f)
            print(len(metadatas))


