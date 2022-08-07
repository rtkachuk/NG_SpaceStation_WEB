import websockets
import core
import asyncio
from logWorker import configureLogger

mapSockLog = configureLogger(name="mapSocket")

async def main():
    async with websockets.serve(core.mapSenderHandler, "0.0.0.0", 8082, logger=mapSockLog):
        await asyncio.Future()

async def init():
    await core.init("configs")

asyncio.run(init())
asyncio.run(main())