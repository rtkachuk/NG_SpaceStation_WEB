import redisWorker
import mapWorker
import requests
import os
import sys
from logWorker import configureLogger

coreLog = configureLogger(name="CORE")
itemsKeeperUrl = os.getenv("ItemsKeeperUrl", default="http://ss_itemskeeper:8085")
managerUrl = os.getenv("ManagerUrl", default="http://ss_manager:8084")

def sendToAll(message):
    response = requests.get(managerUrl + "/send?msg=" + str(message))
    if str(response.status_code) != "200":
        coreLog.error(message + ": " + str(response.status_code))

def processMovement(player, key):
    baseX,baseY = redisWorker.getPlayerPostition(player)
    x,y = baseX,baseY
    match (key):
        case "W": y-=1
        case "S": y+=1
        case "A": x-=1
        case "D": x+=1

    resultPosition = str(x) + " " + str(y)

    if mapWorker.checkPositionMovable(x,y):
        redisWorker.setPlayerPosition(player,x,y)
        closed = checkDoorClosing(baseX,baseY)
        if closed:
            redisWorker.setPlayerPosition(player,x,y)
            sendToAll(player + " CLOSE " + str(x) + " " + str(y) + " " + 'c' + " " + str(baseX) + " " + str(baseY))
        else:
            sendToAll(player + " MOVE " + str(x) + " " + str(y))
    else:
        openable = mapWorker.processOpenable(x,y)
        sendToAll("UPD " + resultPosition + " " + openable)

def getPlayerDirectionPosition(player, direction):
    x,y = redisWorker.getPlayerPostition(player)
    match (direction):
        case "W": y-=1
        case "S": y+=1
        case "A": x-=1
        case "D": x+=1
    
    return { "x": x, "y": y }

def checkDoorClosing(x, y):
    door_closed = False
    if mapWorker.processOpenable(x,y) == 'c':
        door_closed = True
    return door_closed
