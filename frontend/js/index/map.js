let cSize = 40;

var players = {};

var offsetX = 0;
var offsetY = 0;

mapData = [];

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
    case ".":
      img = floor;
      break;
    case "#":
      img = wall;
      break;
    case "1":
      img = floor1;
      break;
    case "2":
      img = floor2;
      break;
    case "3":
      img = floor3;
      break;
    case "4":
      img = floor4;
      break;
    case "5":
      img = floor5;
      break;
    case "6":
      img = floor6;
      break;
    case "7":
      img = floor7;
      break;
    case "8":
      img = floor8;
      break;
    case "9":
      img = floor9;
      break;
    case "@":
      img = floor10;
      break;
    case "!":
      img = floor11;
      break;
    case "*":
      img = space1;
      break;
    case "c":
      img = doorClosed;
      break;
    case "o":
      img = doorOpen;
      break;
    default:
      img = floor;
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

function component(x, y, color) {
  this.width = cSize;
  this.height = cSize;
  this.x = 0;
  this.y = 0;
  this.update = function () {
    ctx = map.context;
    ctx.drawImage(
      playerModel,
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
    players[id] = new component(50, 50, "red");
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
