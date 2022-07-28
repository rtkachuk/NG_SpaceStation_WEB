let cSize = 40;

var players = {};

var offsetX = 0;
var offsetY = 0;

mapData = [];
mapFile = "./configs/map.txt";

function start() {
  parseMap();
  initMap();
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
    ctx.stroke();
  },
};

function drawTile(id, x, y) {
  ctx = map.context;
  img = null;
  switch (id) {
    case ".":
      img = floor;
      break;
    case "#":
      img = wall;
      break;
    case "*":
      img = space1;
      break;
    default:
      img = floor; console.log(id);
  }
  ctx.drawImage(img, x, y, cSize, cSize);
}

function parseMap() {
  fetch(mapFile)
    .then((response) => response.text())
    .then((data) => {
      this.mapData = data.split(/\r?\n/);
      initMap();
    });
}

function initMap() {
  for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {
      drawTile(mapData[y][x], x * cSize + offsetX * cSize, y * cSize + offsetY * cSize);
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
}
