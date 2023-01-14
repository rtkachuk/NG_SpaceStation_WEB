import argparse
import os
from pynput.keyboard import Key, Listener, KeyCode, Controller
from termcolor import colored, cprint
import time
import random

keyboard = Controller()
map = []
positions = {}
posx = 0
posy = 0

pos1x = -1
pos1y = -1
pos2x = -1
pos2y = -1

selectionMode = False
itemsShow = False
itemsView = False

viewRange = 30
viewStart = 0

def loadMap(path):
    global map
    with open(path) as f:
        data = f.readlines()
        for line in data:
            lst = []
            for item in line:
                lst.append(item)
            map.append(lst.copy())
            lst.clear()

def loadPositions(path):
    global positions
    with open(path) as f:
        data = f.readlines()
        for line in data:
            id, x, y = line.rstrip().split(":")
            try:
                positions[str(x) + ":" + str(y)].append(id)
            except:
                positions[str(x) + ":" + str(y)] = [id]
    
def itemExistsByPos(x, y):
    global positions
    return str(x) + ":" + str(y) in positions.keys()

def showItems():
    global posx
    global posy
    global positions

    for key in positions.keys():
        if key == str(posx) + ":" + str(posy):
            print (positions[key])
            return


def showMap():
    global map
    global posx
    global posy
    global pos1x
    global pos1y
    global pos2x
    global pos2y
    global itemsShow
    global viewRange
    global viewStart

    for row in range (0, len(map)):
        for col in range(0, len(map[row])):
            if row < viewStart:
                continue
            if row > viewRange + viewStart:
                return
            if row == posy and col == posx:
                cprint("X", 'green', attrs=['blink'], end="")
            elif itemsShow and itemExistsByPos(col, row):
                cprint("*", "yellow", attrs=['blink'], end="")
            elif row >= pos1y and row <= pos2y and col >= pos1x and col <= pos2x:
                cprint("X", 'red', attrs=['blink'], end="")
            else:
                print (map[row][col], end="")

def updateMap(ch, spaceMode=False):
    global map
    global pos1x
    global pos1y
    global pos2x
    global pos2y

    for row in range (0, len(map)):
        for col in range(0, len(map[row])):
            if row >= pos1y and row <= pos2y and col >= pos1x and col <= pos2x:
                if spaceMode:
                    map[row][col] = random.choice(['*', '#', '$', '%', '^', '&', '(', ')', '[', ']'])
                else:
                    map[row][col] = ch

def processArguments():
    parser = argparse.ArgumentParser()
    parser.add_argument('-l', '--load', help='Load map')
    parser.add_argument('-p', '--load-positions', help='Load item positions')
    return parser.parse_args()

#def on_press(key):
#    print('{0} pressed'.format(
#        key))

def flushInput():
    keyboard.press(Key.enter)
    keyboard.release(Key.enter)
    try:
        int(input())
    except Exception as e:
        print ("Flushing input...")
    time.sleep(1)

def save():
    global map
    global positions
    # Save map
    with open("map.txt", "w") as f:
        for row in map:
            for item in row:
                f.write(item)
    # Save items
    with open("itemPositions.txt", "w") as f:
        for key in positions.keys():
            for item in positions[key]:
                f.write(item + ":" + key + "\n")

def addItem():
    global positions
    global posx
    global posy

    flushInput()
    item = input("ItemToAdd? ")
    try:
        positions[str(posx) + ":" + str(posy)].append(item)
    except:
        positions[str(posx) + ":" + str(posy)] = [item]
    

def on_release(key):
    global posx
    global posy
    global pos1x
    global pos1y
    global pos2x
    global pos2y
    global selectionMode
    global itemsShow
    global itemsView
    global keyboard
    global viewStart

    if key == Key.up:
        posy = posy-1
    if key == Key.down:
        posy = posy+1
    if key == Key.left:
        posx = posx-1
    if key == Key.right:
        posx = posx+1
    if key == KeyCode(char='u'):
        flushInput()
        ch = str(input("Char: "))
        updateMap(ch)
    if key == KeyCode(char='c'):
        pos1x = -1
        pos1y = -1
        pos2x = -1
        pos2y = -1
        selectionMode = False
    if key == KeyCode(char='s'):
        save()
    if key == KeyCode(char='z'):
        if selectionMode:
            pos2x = posx
            pos2y = posy
        else:
            pos1x = posx
            pos1y = posy
        selectionMode = not selectionMode
    if key == KeyCode(char='j'):
        flushInput()
        posx = int(input("X: "))
        posy = int(input("Y: "))
    if key == KeyCode(char='i'):
        itemsShow = not itemsShow
    if key == KeyCode(char='l'):
        itemsView = not itemsView
    if key == KeyCode(char='a'):
        addItem()
    if key == KeyCode(char='q'):
        viewStart = viewStart - 1
    if key == KeyCode(char='e'):
        viewStart = viewStart + 1
    if key == KeyCode(char='o'):
        updateMap('*', True)

    os.system("clear")
    if itemsView:
        showItems()
    else:
        showMap()
    if selectionMode:
        print ("Selected first point!")

    print ("[" + str(posx) + ":" + str(posy) + "]")

def loop(arguments):
    if getattr(arguments, "load"):
        loadMap(getattr(arguments, "load"))

    if getattr(arguments, "load_positions"):
        loadPositions(getattr(arguments, "load_positions"))

    with Listener(
        #on_press=on_press,
        on_release=on_release) as listener:
        listener.join()

def main():
    arguments = processArguments()
    loop(arguments)

main()