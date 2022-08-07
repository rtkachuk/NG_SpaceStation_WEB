from flask import Flask, json, make_response, request
import core
from logWorker import configureLogger

mapSockLog = configureLogger(name="mapSocket")

api = Flask("MapLoader")

def generateResponse(data):
    response = make_response(data)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@api.route('/map', methods=['GET'])
def getMap():
    response = generateResponse(json.dumps(core.getMap()))
    response.mimetype = "application/json"
    return response

@api.route('/getElem', methods=['GET'])
def getElem():
    x = int(request.args.get('x'))
    y = int(request.args.get('y'))
    response = generateResponse(core.getElement(x, y))
    return response

@api.route('/setElem', methods=['GET'])
def setElem():
    x = int(request.args.get('x'))
    y = int(request.args.get('y'))
    elem = request.args.get('elem')
    response = generateResponse(core.setElement(elem, x, y))
    return response
    
def init():
    core.init("configs")

init()
api.run(host="0.0.0.0", port="8082")