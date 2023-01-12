import redisWorker
import mapWorker
import requests
import os
from logWorker import configureLogger

coreLog = configureLogger(name="CORE")

def sendToAll(message):
    response = requests.get(os.getenv("ManagerUrl", 
                            default="http://ss_manager:8084/send?msg=" + str(message)))
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
        sendToAll(player + " MOVE " + str(x) + " " + str(y))
    else:
        openable = mapWorker.processOpenable(x,y)
        sendToAll("UPD " + resultPosition + " " + openable)