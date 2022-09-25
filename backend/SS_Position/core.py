import redisWorker
import mapWorker
import requests
import os
from logWorker import configureLogger

coreLog = configureLogger(name="CORE")

def sendToAll(command):
#    message = player + " " if not "UPD" in command else ""
    response = requests.get(os.getenv("ConnectorUrl", 
                            default="http://ss_connector:8084/send?msg=" + str(command)))
    if str(response.status_code) != "200":
        coreLog.error(message + ": " + str(response.status_code))

def processMessage(player, message):
    if "MOVE" in message:
        cmd, dir = message.split(" ")
        processMovement(player, dir)

def processMovement(player, key):
    baseX,baseY = redisWorker.getPlayerPostition(player)
    x,y = baseX,baseY
    match (key):
        case "W": y-=1
        case "S": y+=1
        case "A": x-=1
        case "D": x+=1

    resultPosition = str(x) + " " + str(y)

    closed = checkDoorClosing(baseX,baseY)
    if closed:
        #redisWorker.setPlayerPosition(player,x,y)
        if mapWorker.checkPositionMovable(x,y):
            redisWorker.setPlayerPosition(player,x,y)
            sendToAll(" CLOSE " + str(x) + " " + str(y) + " " + 'c' + " " + str(baseX) + " " + str(baseY))
        else:
            sendToAll("UPD " + resultPosition + " " + mapWorker.processOpenable(x,y))
    elif mapWorker.checkPositionMovable(x,y):
        redisWorker.setPlayerPosition(player,x,y)
        sendToAll(" MOVE " + str(x) + " " + str(y))
    else:
        openable = mapWorker.processOpenable(x,y)
        sendToAll("UPD " + resultPosition + " " + openable)


def checkDoorClosing(x, y):
    door_closed = False
    if mapWorker.processOpenable(x,y) == 'c':
        door_closed = True
    return door_closed
