import websockets
import mapLoader
from logWorker import configureLogger

connectorLog = configureLogger(name="core")

async def init(src):
    mapLoader.initMap(src + "/map.txt")

async def mapSenderHandler(websocket):
    try:
        map = mapLoader.getCurrentMap()
        player = websocket.remote_address[0]
        for line in map:
            row = ""
            for letter in line:
                row += letter
            await websocket.send("MAP " + row)
        await websocket.send("END")
        connectorLog.info("Delivered map for " + player)
    except websockets.exceptions.ConnectionClosed:
        connectorLog.info("Map socket closed for " + player)