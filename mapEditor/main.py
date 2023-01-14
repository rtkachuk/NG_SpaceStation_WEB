import argparse
import os
from pynput.keyboard import Key, Listener, KeyCode, Controller
from termcolor import colored, cprint
import time

keyboard = Controller()
map = []
positions = []
posx = 0
posy = 0

pos1x = -1
pos1y = -1
pos2x = -1
pos2y = -1

selectionMode = False

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
        positions = f.readlines()
    
def showMap():
    global map
    global posx
    global posy
    global pos1x
    global pos1y
    global pos2x
    global pos2y

    for row in range (0, len(map)):
        for col in range(0, len(map[row])):
            if row == posy and col == posx:
                cprint("X", 'green', attrs=['blink'], end="")
            elif row >= pos1y and row <= pos2y and col >= pos1x and col <= pos2x:
                cprint("X", 'red', attrs=['blink'], end="")
            else:
                print (map[row][col], end="")

def updateMap(ch):
    global map
    global pos1x
    global pos1y
    global pos2x
    global pos2y

    for row in range (0, len(map)):
        for col in range(0, len(map[row])):
            if row >= pos1y and row <= pos2y and col >= pos1x and col <= pos2x:
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

def save():
    global map
    with open("map.txt", "w") as f:
        for row in map:
            for item in row:
                f.write(item)

def on_release(key):
    global posx
    global posy
    global pos1x
    global pos1y
    global pos2x
    global pos2y
    global selectionMode
    global keyboard

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

    os.system("clear")
    showMap()
    if selectionMode:
        print ("Selected first point!")

def loop(arguments):
    if getattr(arguments, "load"):
        loadMap(getattr(arguments, "load"))

    if getattr(arguments, "load_positions"):
        loadMap(getattr(arguments, "load_positions"))

    with Listener(
        #on_press=on_press,
        on_release=on_release) as listener:
        listener.join()

def main():
    arguments = processArguments()
    loop(arguments)

main()