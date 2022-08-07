import mapLoader
from logWorker import configureLogger

connectorLog = configureLogger(name="core")

def init(src):
    mapLoader.initMap(src + "/map.txt")

def getMap():
    return mapLoader.getCurrentMap()

def setElement(elem, x, y):
    mapLoader.replaceItem(elem, x, y)
    return getElement(x,y)

def getElement(x,y):
    return mapLoader.getItem(x,y)