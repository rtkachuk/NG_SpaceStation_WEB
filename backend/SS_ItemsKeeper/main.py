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

@api.route('/getItemByPlaceHolder', methods=['POST'])
def getIdByPlaceHolder():
    placeHolder = str(request.form.get('pholder'))
    for item in itemsList:
        if item['pholder'] == placeHolder:
            return generateResponse(json.dumps(item))
    return generateResponse("NO ITEM")

@api.route('/getImages', methods=['POST'])
def getImages():
    return generateResponse(json.dumps(itemsList))

@api.route('/getPositions', methods=['POST'])
def getPositions():
    return generateResponse(json.dumps(positions))

@api.route('/getImagesList', methods=['POST'])
def getImagesList():
    imagesList = list(map(lambda x: x["img"], itemsList))
    return generateResponse(json.dumps(imagesList));

@api.route('/getPlaceholders', methods=['POST'])
def getPlaceHolders():
    placeholders = list(map(lambda x: x["pholder"], itemsList))
    return generateResponse(json.dumps(placeholders))

@api.route('/getNames', methods=['POST'])
def getNames():
    names = list(map(lambda x: x["name"], itemsList))
    return generateResponse(json.dumps(names))

def start():
    initItems()
    api.run(host="0.0.0.0", port=8085)

start()