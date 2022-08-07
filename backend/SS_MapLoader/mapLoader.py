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

def replaceItem(elem, x, y):
    map[y][x] = elem

def getItem(x, y):
    return map[y][x]

def getCurrentMap():
    return map