import asyncio
import websockets

import core

from logWorker import configureLogger

connectorLog = configureLogger(name="CONNECTOR")
clients = []

def start():
    core.init("configs")

async def positionSocketHandler(websocket):
    try:
        clients.append(websocket)
        player = websocket.remote_address[0]
        await websocket.send("ID " + player)
        connectorLog.info("New connection from " + player)
        while True:
            message = await websocket.recv()
            command = core.processMessage(player, message)
            for client in clients:
                await client.send(player + " " + command)
    except websockets.exceptions.ConnectionClosed:
        connectorLog.error ("Connection dropped")
        clients.remove(websocket)
        for client in clients:
            await client.send("KICK " + player)

async def mapSenderHandler(websocket):
    try:
        map = core.getMap()
        player = websocket.remote_address[0]
        for line in map:
            await websocket.send("MAP " + line)
        await websocket.send("END")
        connectorLog.info("Delivered map for " + player)
    except websockets.exceptions.ConnectionClosed:
        connectorLog.info("Map socket closed for " + player)