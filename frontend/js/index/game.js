let gameStage = new Stage();

function start() {
  console.log('Map data', mapData);
  STAGE_MANAGER.changeStage(gameStage);
  initMap();
}

function drawTile(id, x, y) {
  img = tileImages[id];
  if (typeof img == 'undefined')
    img = tileImages['.'];
  gameStage.drawTile(img, x, y);
}

function initMap() {
  for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {
      drawTile(
        mapData[y][x],
        x * cSize,
        y * cSize
      );
    }
  }

  for (let i = 0; i < items.length; i++) {
    gameStage.addItem(items[i]);
  }
}

function updateMap(x, y, item) {
  mapData[y][x] = item;
  drawTile(
    mapData[y][x],
    x * cSize,
    y * cSize
  );
}

function updatePlayerPos(id, x, y) {
  if (players.hasOwnProperty(id) == false) {
    players[id] = new Item(50, 50, 57, images[57]["img"]);
    gameStage.addItem(players[id]);
  }
  player = players[id];
  player.newPos(x, y);
  if (ID && (ID == id)) {
    alignCamera((-player.x + 10), (-player.y + 7));
  }
}

function alignCamera(x,y) {
  offsetY = y;
  offsetX = x;
  STAGE_MANAGER.moveCameraTo(new PIXI.Point(offsetX * cSize, offsetY * cSize));
}

function kick(id) {
  delete players[id];
}