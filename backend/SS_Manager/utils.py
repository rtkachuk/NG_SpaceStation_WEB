import requests
import os

positionUrl = os.getenv("PositionUrl", default="http://ss_position:8081")

def move(options):
    answer = requests.post(positionUrl + "/move", data = options)
    return answer.text


def parseClientMessage(player, message):
    data = message.split(" ")
    cmd = data[0] # Command
    if cmd == "MOVE": # MOVE Up
        options = { "player" : player, "direction" : data[1] }
        return move(options)