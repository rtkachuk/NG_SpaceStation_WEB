import requests
import os
import json
from logWorker import configureLogger
mapLog = configureLogger(name="MapWorker")

mapLoaderUrl = os.getenv("mapLoaderUrl", default="http://ss_maploader:8082")
itemsKeeperUrl = os.getenv("ItemsKeeperUrl", default="http://ss_itemskeeper:8085")

def getElement(x, y):
    response = requests.get(mapLoaderUrl + "/getElem?x=" + str(x) + "&y=" + str(y))
    return response.text

def setElement(elem, x, y):
    response = requests.get(mapLoaderUrl + "/setElem?elem=" + str(elem) + "&x=" + str(x) + "&y=" + str(y))
    return response.text

def getItemByPlaceHolder(placeHolder):
    responce = requests.post(itemsKeeperUrl + "/getItemByPlaceHolder", data={'pholder': placeHolder})
    return json.loads(responce.text)

def checkPositionMovable(x, y):
    pholder = getElement(x, y)
    item = getItemByPlaceHolder(pholder)
    return item['type'] == "passage"

def processOpenable(x, y):
    item = getElement(x ,y)
    match item:
        case 'c': return setElement('o', x, y)
    return item
