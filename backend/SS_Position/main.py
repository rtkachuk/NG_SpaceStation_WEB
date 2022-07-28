import asyncio
import websockets

import core
from logWorker import configureLogger

serverlog = configureLogger(name="SERVER")
clients = []

def start():
    core.init("configs")

async def root(websocket):
    try:
        clients.append(websocket)
        player = websocket.remote_address[0]
        await websocket.send("ID " + player)
        serverlog.info("New connection from " + player)
        while True:
            message = await websocket.recv()
            command = core.process(player, message)
            for client in clients:
                await client.send(player + " " + command)
    except websockets.exceptions.ConnectionClosed:
        serverlog.error ("Connection dropped")
        clients.remove(websocket)
        for client in clients:
            await client.send("KICK " + player)

async def main():
    async with websockets.serve(root, "0.0.0.0", 8081, logger=serverlog):
        await asyncio.Future()

start()
asyncio.run(main())