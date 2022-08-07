import asyncio
import websockets
import core

from logWorker import configureLogger

posSockLog = configureLogger(name="positionSocket")
clients = []


async def positionSocketHandler(websocket):
    try:
        clients.append(websocket)
        player = websocket.remote_address[0]
        await websocket.send("ID " + player)
        posSockLog.info("New connection from " + player)
        while True:
            message = await websocket.recv()
            command = core.processMessage(player, message)
            message = player + " " if "MOVE" in command else ""
            for client in clients:
                await client.send( message + command)
    except websockets.exceptions.ConnectionClosed:
        posSockLog.error ("Connection dropped")
        clients.remove(websocket)
        for client in clients:
            await client.send("KICK " + player)

async def main():
    async with websockets.serve(positionSocketHandler, "0.0.0.0", 8081, logger=posSockLog):
        await asyncio.Future()
        
asyncio.run(main())