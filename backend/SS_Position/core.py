import redisWorker
import mapWorker
from logWorker import configureLogger

coreLog = configureLogger(name="CORE")

def init(configsSrc):
    mapWorker.initMap(configsSrc + "/map.txt")

def processMessage(player, message):
    if "MOVE" in message:
        cmd, dir = message.split(" ")
        return "MOVE " + processMovement(player, dir)
    return "ERROR"

def processMovement(player, key):
    baseX,baseY = redisWorker.getPlayerPostition(player)
    x,y = baseX,baseY
    match (key):
        case "W": y-=1
        case "S": y+=1
        case "A": x-=1
        case "D": x+=1

    if mapWorker.checkPositionMovable(x,y):
        redisWorker.setPlayerPosition(player,x,y)
        return str(x) + " " + str(y)
    else:
        return str(baseX) + " " + str(baseY)

def getMap():
    return mapWorker.getCurrentMap()