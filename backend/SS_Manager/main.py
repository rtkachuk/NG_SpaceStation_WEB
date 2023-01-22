import asyncio

import core
from threading import Thread

def start():
    socketThread = Thread(target=core.sockWorker)
    flaskThread = Thread(target=core.apiWorker)

    socketThread.start()
    flaskThread.start()

    socketThread.join()
    flaskThread.join()

start()