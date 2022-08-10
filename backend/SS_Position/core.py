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

    closed = checkDoorClosing(baseX,baseY)
    if closed != "":
        redisWorker.setPlayerPosition(player,x,y)
        return  "CLOSE " + str(x) + " " + str(y) + " " + closed
    elif mapWorker.checkPositionMovable(x,y):
        redisWorker.setPlayerPosition(player,x,y)
        return "MOVE " + str(x) + " " + str(y)
    else:
        return "UPD " + resultPosition + " " + mapWorker.processOpenable(x,y)

def checkDoorClosing(x, y):
    door_closed = ""
    if mapWorker.processOpenable(x,y) == 'c':
        door_closed = 'c' + " " + str(x) + " " + str(y)
    return door_closed
