import asyncio
import websockets

import core
from logWorker import configureLogger

serverlog = configureLogger(name="SERVER")

async def root(websocket):
    try:
        player = websocket.remote_address[0]
        serverlog.info("New connection from " + player)
        while True:
            message = await websocket.recv()
            await websocket.send(core.process(player, message))
    except websockets.exceptions.ConnectionClosed:
        serverlog.error ("Connection dropped")

async def main():
    async with websockets.serve(root, "localhost", 8081, logger=serverlog):
        await asyncio.Future()

asyncio.run(main())