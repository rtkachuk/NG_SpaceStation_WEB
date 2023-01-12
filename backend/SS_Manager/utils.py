import requests
import os

positionUrl = os.getenv("PositionUrl", default="http://ss_position:8081")
itemsKeeperUrl = os.getenv("ItemsKeeperUrl", default="http://ss_itemskeeper:8085")

def move(options):
    answer = requests.post(positionUrl + "/move", data = options)
    return answer.text

def parseClientMessage(player, message):
    data = message.split(" ")
    cmd = data[0] # Command
    match (cmd):
        case "MOVE": return move({ "player" : player, "direction" : data[1] }) # Move W - move up