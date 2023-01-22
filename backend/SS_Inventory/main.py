from flask import Flask, json, make_response, request
from core import *

api = Flask("InventoryWorker")

def generateResponse(data):
    response = make_response(data)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@api.route("/list", methods=['POST'])
def listI():
    id = str(request.form.get('player'))
    getInventory(id)
    return generateResponse("OK")

@api.route("/add", methods=['POST'])
def addI():
    id = str(request.form.get('player'))
    direction = str(request.form.get('direction'))
    addItemByDirection(id, direction)
    return generateResponse("OK")

@api.route("/del", methods=['POST'])
def delI():
    id = str(request.form.get('player'))
    item = str(request.form.get('item'))
    delItem(id, item)
    return generateResponse("OK")

api.debug = True
api.run(host="0.0.0.0", port=8086)