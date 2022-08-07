from logWorker import configureLogger
mapLog = configureLogger(name="MapWorker")

map = []

def initMap(src):
    mapFile = open(src, "r")
    for line in mapFile:
        row = []
        for letter in line:
            row.append(letter)
        map.append(row)

def checkPositionMovable(x, y):
    return map[y][x] == '.' or map[y][x] == 'o'

def processOpenable(x, y):
    match map[y][x]:
        case 'c': map[y][x] = 'o'
    return map[y][x]
