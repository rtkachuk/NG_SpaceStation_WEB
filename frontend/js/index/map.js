let cSize = 40;

var players = {};

var offsetX = 0;
var offsetY = 0;

mapData = [];
imagePlaceholders = {};
images = {};
items = [];

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
  img = imagePlaceholders[id];
  if (typeof img == 'undefined')
    img = imagePlaceholders['.'];
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

function component(x, y, id, image) {
  this.width = cSize;
  this.height = cSize;
  this.id = id;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx = map.context;
    ctx.drawImage(
      image,
      this.x * cSize+ offsetX * cSize,
      this.y * cSize + offsetY * cSize,
      cSize,
      cSize
    );
  };

  this.clear = function() {
    ctx = map.context;
    ctx.clearRect(
      this.x * cSize+ offsetX * cSize,
      this.y * cSize + offsetY * cSize,
      cSize,
      cSize
    );
  }
  this.newPos = function (x, y) {
    this.x = x;
    this.y = y;
  };
}

function redrawTile(x, y) {
  ctx = map.context;
  ctx.fillRect(x * cSize + offsetX * cSize, y * cSize + offsetY * cSize, cSize, cSize);
}

function updateAll() {
  map.clear();
  for (const [key, value] of Object.entries(players)) {
    value.update();
  }
  items.forEach(function(item) {
    item.update();
  });
  map.context.stroke();
}

function updateMap(x, y, item) {
  mapData[y][x] = item;
  updateAll();
}

function updatePlayerPos(id, x, y) {
  if (players.hasOwnProperty(id) == false) {
    players[id] = new component(50, 50, 57, images[57]["img"]);
  }
  player = players[id];
  player.newPos(x, y);
  alignCamera((-player.x + 12), (-player.y + 8));
  updateAll();
}

function alignCamera(x,y) {
  offsetY = y;
  offsetX = x;
  console.log("x:" + offsetX);
  console.log("y:" + offsetY);
}

// function offsetUp() {
//   offsetY++;
//   updateAll();
// }

// function offsetDown() {
//   offsetY--;
//   updateAll();
// }

// function offsetLeft() {
//   offsetX++;
//   updateAll();
// }

// function offsetRight() {
//   offsetX--;
//   updateAll();
// }

function kick(id) {
  delete players[id];
  updateAll(id);
}
