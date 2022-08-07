import redisWorker
import mapWorker
from logWorker import configureLogger

coreLog = configureLogger(name="CORE")

def processMessage(player, message):
    if "MOVE" in message:
        cmd, dir = message.split(" ")
        return processMovement(player, dir)
    return "ERROR"

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
        return "MOVE " + str(x) + " " + str(y)
    else:
        return "UPD " + resultPosition + " " + mapWorker.processOpenable(x,y)