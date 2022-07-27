import redis
import os

from logWorker import configureLogger

redisLog = configureLogger(name="REDIS")

redis = redis.Redis(
    host = os.getenv("redisHost", default="localhost"),
    port = os.getenv("redisPort", default="6379")
)

def getPlayerPostition(player):
    return ensureVariableExists(player)

def ensureVariableExists(player):
    item = redis.get(player)
    if not redis.exists(player):
        redis.set(player, "0 0")
    item = redis.get(player)
    return str(item.decode("utf8"))

def doPlayerMovement(player, direction):

    item = ensureVariableExists(player)

    x,y = str(item).split(" ")
    x = int(x)
    y = int(y)

    redisLog.debug("Moving " + player + " to " + direction)
    match (direction):
        case "W": y-=1
        case "S": y+=1
        case "A": x-=1
        case "D": x+=1
    redis.set(player, str(x) + " " + str(y))
    return getPlayerPostition(player)