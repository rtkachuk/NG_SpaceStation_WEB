import redisWorker
from logWorker import configureLogger

coreLog = configureLogger(name="CORE")

def process(player, message):
    if "MOVE" in message:
        cmd, dir = message.split(" ")
        return "MOVE " + processMovement(player, dir)
    return "ERROR"

def processMovement(player, key):
    return redisWorker.doPlayerMovement(player, key)