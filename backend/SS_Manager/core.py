import asyncio
import websockets
from flask import Flask, json, make_response, request
import utils
import sys

from logWorker import configureLogger

connFlaskLog = configureLogger(name="connectionAPI")
connSockLog = configureLogger(name="connectionSocket")

clients = []

api = Flask("connectionApi")

async def sendToClients(msg):
    for client in clients:
        await client.send( msg )

async def sendToClient(id, msg):
    for client in clients:
        if client.remote_address[0] == id:
            await client.send(msg)
            return

def generateResponse(data):
    response = make_response(data)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@api.route('/send', methods=['GET'])
async def getMap():
    response = generateResponse("OK")
    response.mimetype = "application/json"
    msg = str(request.args.get('msg')).replace("%20", " ")
    await sendToClients(msg)
    return response

@api.route('/sendToClient', methods=['POST'])
async def sendClient():
    response = generateResponse("OK")
    id = str(request.form.get('id'))
    msg = str(request.form.get('msg'))
    await sendToClient(id, msg)
    return response

def apiWorker():
    flaskEventLoop = asyncio.new_event_loop()
    asyncio.set_event_loop(flaskEventLoop)
    api.run(host="0.0.0.0", port="8084")
    flaskEventLoop.run_until_complete(api)
    flaskEventLoop.run_forever()
    flaskEventLoop.close()


async def connSocketHandler(websocket):
    try:
        clients.append(websocket)
        player = websocket.remote_address[0]
        await websocket.send("ID " + player)
        responce = await websocket.recv()
        connSockLog.info("New connection from " + player)
        connSockLog.info("Responce: " + str(responce))
        while True:
            print(utils.parseClientMessage(player, await websocket.recv()))
    except websockets.exceptions.ConnectionClosed:
        connSockLog.error ("Connection dropped")
        clients.remove(websocket)
        for client in clients:
            await client.send("KICK " + player)

def sockWorker():
    socketEventLoop = asyncio.new_event_loop()
    asyncio.set_event_loop(socketEventLoop)
    ws_server = websockets.serve(connSocketHandler, "0.0.0.0", 8083, logger=connSockLog)
    socketEventLoop.run_until_complete(ws_server)
    socketEventLoop.run_forever()
    socketEventLoop.close()

