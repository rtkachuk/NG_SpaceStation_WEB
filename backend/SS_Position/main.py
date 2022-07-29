import asyncio
from turtle import position
import websockets

from threading import Thread
import connectivityManager
from logWorker import configureLogger

posSockLog = configureLogger(name="positionSocket")
mapSockLog = configureLogger(name="mapSocket")


def positionWorker():
    eventLoop_position = asyncio.new_event_loop()
    asyncio.set_event_loop(eventLoop_position)
    ws_server = websockets.serve(connectivityManager.positionSocketHandler, "0.0.0.0", 8081, logger=posSockLog)
    eventLoop_position.run_until_complete(ws_server)
    eventLoop_position.run_forever()
    eventLoop_position.close()

def mapSender():
    eventLoop_map = asyncio.new_event_loop()
    asyncio.set_event_loop(eventLoop_map)
    ws_server = websockets.serve(connectivityManager.mapSenderHandler, "0.0.0.0", 8082, logger=mapSockLog)
    eventLoop_map.run_until_complete(ws_server)
    eventLoop_map.run_forever()
    eventLoop_map.close()

def start():
    positionWorkerThread = Thread (target=positionWorker)
    mapWorkerThread = Thread (target=mapSender)

    positionWorkerThread.start()
    mapWorkerThread.start()

    positionWorkerThread.join()
    mapWorkerThread.join()

connectivityManager.start()
start()