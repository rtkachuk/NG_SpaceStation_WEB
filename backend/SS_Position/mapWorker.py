import requests
import os
from logWorker import configureLogger
mapLog = configureLogger(name="MapWorker")


def getElement(x, y):
    response = requests.get(os.getenv("mapLoaderUrl", 
                            default="http://ss_maploader:8082/getElem?x=" + str(x) + "&y=" + str(y)))
    return response.text

def setElement(elem, x, y):
    response = requests.get(os.getenv("mapLoaderUrl", 
                            default="http://ss_maploader:8082/setElem?elem=" + str(elem) + "&x=" + str(x) + "&y=" + str(y)))
    return response.text

def checkPositionMovable(x, y):
    item = getElement(x, y)
    return item == '.' or item == 'o'

def processOpenable(x, y):
    item = getElement(x ,y)
    match item:
        case 'c': return setElement('o', x, y)
    return item
