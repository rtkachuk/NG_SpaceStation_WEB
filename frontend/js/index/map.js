let cSize = 40;

var players = {};

var offsetX = 0;
var offsetY = 0;

mapData = [];
images = {};

function start() {
  console.log(mapData);
  map.start();
}

var map = {
  canvas: document.getElementById("myCanvas"),
  start: function () {
    this.context = this.canvas.getContext("2d");
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    initMap();
    this.context.stroke();
  },
};

function drawTile(id, x, y) {
  img = null;
  switch (id) {
    case ".": img = images["floor"]; break;
    case "w": img = images["wall"]; break;
    case "1": img = images["floor1"]; break;
    case "2": img = images["floor2"]; break;
    case "3": img = images["floor3"]; break;
    case "4": img = images["floor4"]; break;
    case "5": img = images["floor5"]; break;
    case "6": img = images["floor6"]; break;
    case "7": img = images["floor7"]; break;
    case "8": img = images["floor8"]; break;
    case "9": img = images["floor9"]; break;
    case "@": img = images["floor10"]; break;
    case "!": img = images["floor11"]; break;
    case "*": img = images["space1"]; break;
    case "c": img = images["door_closed"]; break;
    case "o": img = images["door_open"]; break;
    default: img = images["floor"];
  }
  
  map.context.drawImage(img, x, y, cSize, cSize);
}

function initMap() {
  for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {
      drawTile(
        mapData[y][x],
        x * cSize + offsetX * cSize,
        y * cSize + offsetY * cSize
      );
    }
  }
}

function component(x, y) {
  this.width = cSize;
  this.height = cSize;
  this.x = 0;
  this.y = 0;
  this.update = function () {
    ctx = map.context;
    ctx.drawImage(
      images["fox_right"],
      this.x + offsetX * cSize,
      this.y + offsetY * cSize,
      cSize,
      cSize
    );
  };
  this.newPos = function (x, y) {
    this.x = x;
    this.y = y;
  };
}

function updateAll() {
  map.clear();
  for (const [key, value] of Object.entries(players)) {
    value.update();
  }
  map.context.stroke();
}

function updateMap(x, y, item) {
  mapData[y][x] = item;
  updateAll();
}

function updatePlayerPos(id, x, y) {
  if (players.hasOwnProperty(id) == false) {
    players[id] = new component(50, 50);
  }
  player = players[id];
  player.newPos(x * cSize, y * cSize);
  updateAll();
}

function offsetUp() {
  offsetY++;
  updateAll();
}

function offsetDown() {
  offsetY--;
  updateAll();
}

function offsetLeft() {
  offsetX++;
  updateAll();
}

function offsetRight() {
  offsetX--;
  updateAll();
}

function kick(id) {
  delete players[id];
  updateAll(id);
}
