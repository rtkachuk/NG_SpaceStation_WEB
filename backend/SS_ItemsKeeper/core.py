import os

itemsList = []
positions = { }

def parseItem(item):
    items = item.split(":")
    result = {
        "id": int(items[0]),
        "type": items[1],
        "name": items[2],
        "wear": items[3],
        "option": items[4],
        "dmgType": items[5],
        "damage": int(items[6]),
        "img": items[7],
        "pholder": items[8],
        "desc": items[9] 
    }
    return result

def loadItemsFromFile(path):
    global itemsList
    with open(path) as f:
        items = f.readlines()
        for line in items:
            itemsList.append(parseItem(line))

def loadPositionsFromFile(path):
    global positions
    with open(path) as f:
        buffer = f.readlines()
        for line in buffer:
            id,x,y = line.rstrip().split(":")
            position = str(x) + "," + str(y)
            if position not in positions:
                positions[position] = [id]
            else:
                positions[position].append(id)
    print (positions)

def initItems():
    itemsFile = os.getenv("itemFilePath", default="configs/items.txt")
    positionsFile = os.getenv("itemPositionsFilePath", default="configs/itemPositions.txt")

    loadItemsFromFile(itemsFile)
    loadPositionsFromFile(positionsFile)