from flask import Flask, json, make_response, request
import core
import redisWorker
import sys

from logWorker import configureLogger

def generateResponse(data):
    response = make_response(data)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

api = Flask("SS_Position")

@api.route("/move", methods=["POST"])
def apiMove():
    player = request.form.get("player")
    direction = request.form.get("direction")
    core.processMovement(player, direction)
    return generateResponse("OK")

@api.route("/getPlayerDirectionPos", methods=["POST"])
def apiGetPos():
    player = request.form.get("player")
    direction = request.form.get("direction")
    return generateResponse(json.dumps(core.getPlayerDirectionPosition(player, direction)))
    

def main():
    api.run(host="0.0.0.0", port=8081)

main()