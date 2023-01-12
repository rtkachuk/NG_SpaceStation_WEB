itemsList = []

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

def initItems(path):
    global itemsList
    with open(path) as f:
        items = f.readlines()
        for line in items:
            itemsList.append(parseItem(line))