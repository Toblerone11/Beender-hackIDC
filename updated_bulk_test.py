import os
import PIL.ExifTags
import PIL.Image
import sys

# (34853, 'GPSInfo')
# (306, 'DateTime')
# 1:'GPSLatitudeRef', 2: 'GPSLatitude', 3: 'GPSLongitudeRef', 4: 'GPSLongitude',
GPSInfo_TagId = 34853
DateTime_TagId = 306
GPSINFO_TIMESTAMP = 7
GPSINFO_DATESTAMP = 29

def has_metadata(path):    
    img = PIL.Image.open(path)
    exif = img._getexif()
    return GPSInfo_TagId in exif and \
        all([gps_detail in exif[GPSInfo_TagId] for gps_detail in [1, 2, 3, 4]]) and \
         (DateTime_TagId in exif or (GPSINFO_DATESTAMP in exif[GPSInfo_TagId] and GPSINFO_TIMESTAMP in exif[GPSInfo_TagId]))

def test_directory(root_directory):
    bad_paths = []
    for root, subdirs, files in os.walk(root_directory):
        print 'Checking', len(files)
        for file in files:
            if os.path.splitext(file)[1].lower() in ('.jpg', '.jpeg'):
                full_path = os.path.join(root_directory, file)
                if not has_metadata(full_path):
                    bad_paths.append(full_path)                
    return bad_paths

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print 'Specify directory path'
        exit()
    file = sys.argv[1]
    # root_directory = '.\\Thailand    
    bad_paths = test_directory(sys.argv[1])                            
    if len(bad_paths) == 0:
        print 'No problems'
    else:
        for path in bad_paths:
            print path
    
    # print PIL.ExifTags.GPSTAGS
