from logWorker import configureLogger
mapLog = configureLogger(name="mapLoader")

map = []

def initMap(src):
    mapFile = open(src, "r")
    for line in mapFile:
        row = []
        for letter in line:
            row.append(letter)
        map.append(row)

def getCurrentMap():
    return map