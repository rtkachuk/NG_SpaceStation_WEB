from logWorker import configureLogger
mapLog = configureLogger(name="MapWorker")

map = []

def initMap(src):
    mapFile = open(src, "r")
    for line in mapFile:
        map.append(line)

def checkPositionMovable(x, y):
    return map[y][x] == '.'