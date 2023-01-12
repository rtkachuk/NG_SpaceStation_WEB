from flask import Flask, json, make_response, request
from core import *

def generateResponse(data):
    response = make_response(data)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

api = Flask("SS_ItemsKeeper")

@api.route('/getItemInfo', methods=['POST'])
def getItemInfo():
    try:
        id = int(request.form.get('id'))
        response = generateResponse(json.dumps(itemsList[id]))
    except Exception as exc:
        print (str(exc))
        response = generateResponse("NO ITEM")
    response.mimetype = "application/json"
    return response

def start():
    initItems("configs/items.txt")
    api.run(host="0.0.0.0", port=8085)

start()