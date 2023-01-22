import requests
import os

positionUrl = os.getenv("PositionUrl", default="http://ss_position:8081")
itemsKeeperUrl = os.getenv("ItemsKeeperUrl", default="http://ss_itemskeeper:8085")
inventoryUrl = os.getenv("inventoryUrl", default="http://ss_inventory:8086")

def move(options):
    answer = requests.post(positionUrl + "/move", data = options)
    return answer.text

def pick(options):
    answer = requests.post(inventoryUrl + "/add", data = options)
    return answer.text

def getInventory(options):
    answer = requests.post(inventoryUrl + "/list", data = options)
    return answer.text

def parseClientMessage(player, message):
    print("Responce: " + str(message))
    data = message.split(" ")
    cmd = data[0] # Command
    match (cmd):
        case "MOVE": return move({ "player" : player, "direction" : data[1] }) # MOVE W - move north
        case "PICK": return pick({ "player" : player, "direction" : data[1] }) # PICK S - pick from south
        case "INV": return getInventory({ "player" : player })
