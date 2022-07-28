import redis
import os

from logWorker import configureLogger

redisLog = configureLogger(name="REDIS")

redis = redis.Redis(
    host = os.getenv("redisHost", default="localhost"),
    port = os.getenv("redisPort", default="6379")
)

def getPlayerPostition(player):
    return ensurePositionExists(player)

def ensurePositionExists(player):
    item = redis.get(player)
    if not redis.exists(player):
        redis.set(player, "0 0")
    item = redis.get(player)
    x,y = str(item.decode("utf8")).split(" ")
    return [ int(x), int(y) ]

def setPlayerPosition(player, x, y):
    redis.set(player, str(x) + " " + str(y))