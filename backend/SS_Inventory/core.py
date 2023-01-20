import os
import requests
import json
import sys

inventories = {}

itemsKeeperUrl = os.getenv("ItemsKeeperUrl", default="http://ss_itemskeeper:8085")
managerUrl = os.getenv("ManagerUrl", default="http://ss_manager:8084")
positionUrl = os.getenv("PositionUrl", default="http://ss_position:8081")

def getItemFromCell(itemPos):
    response = requests.post(itemsKeeperUrl + "/getItemIdByPosition", data={"x": itemPos["x"], "y": itemPos["y"]})
    return response.text

def getItemPosition(player, direction):
    response = requests.post(positionUrl + "/getPlayerDirectionPos", data={"player": player, "direction": direction})
    return response.text

def sendToId(id, message):
    response = requests.post(managerUrl + "/sendToClient", data={"id": id, "msg": message})
    if str(response.status_code) != "200":
        print(message + ": " + str(response.status_code))

def sendToAll(message):
    response = requests.get(managerUrl + "/send?msg=" + str(message))
    if str(response.status_code) != "200":
        print ("Can't send to everybody world update!")

def addItem(id, item, itemPos):
    try:
        inventories[id].append(item)
    except Exception as e:
        print (e)
        print ("Creating new inventory")
        inventories[id] = [item]
    getInventory(id)
    sendToAll("WDEL " + str(item) + " " + str(itemPos['x']) + " " + str(itemPos['y']))
    

def delItem(id, item):
    if inventories[id] is not None:
        if item in inventories[id]:
            inventories[id].remove(item)
            sendToId(id, "DROP " + str(item))

def getInventory(id):
    try:
        if inventories[id] is None:
            inventories[id] = []
    except Exception as e:
        inventories[id] = []
    sendToId(id, "INV " + ','.join(str(e) for e in inventories[id]))

def addItemByDirection(id, direction):
    itemPos = json.loads(getItemPosition(id, direction))
    item = getItemFromCell(itemPos)
    addItem(id, item, itemPos)