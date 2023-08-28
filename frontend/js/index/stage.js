let STAGE_MANAGER;

function StageManager(width, height) {
    if (!this._app) {
        this._width = width;
        this._height = height;
        this._cameraPos = new PIXI.Point(0, 0);

        // Create our pixi app
        this._app = new PIXI.Application({
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x000000,
            width: width,
            height: height
        });

    }

    Object.defineProperty(this, 'app', {
        get: () => {
          return this._app;
        }
    });

}

StageManager.prototype.resize = function(width, height) {
    if (this._app.stage) {
        this._app.renderer.resize((height + height/3), height);
        this._app.stage.scale.set((height + height/3)/this._width, height/this._height);
    }
}

/**
 * Call this function when you want to go to a new scene
 * @param {Stage} stage 
 */
StageManager.prototype.changeStage = function(stage) {
    this._app.stage = stage;
    this._app.stage.scale.set((this._app.renderer.height + this._app.renderer.height/3)/this.width,
        this._app.renderer.height/this.height);
    this.tick();
}

StageManager.prototype.moveCameraTo = function(position) {
    this._cameraPos = new PIXI.Point().copyFrom(position);
}

StageManager.prototype.tick = function() {  
    let newTick = Date.now();
    let deltaTime = newTick - this._lastTick;
    this._lastTick = newTick;
    if (deltaTime < 0) deltaTime = 0;
    if (deltaTime > 100) deltaTime = 100;
    let deltaFrame = deltaTime * 60 / 1000;
  
    STAGE_MANAGER.update(deltaFrame);
    requestAnimationFrame(STAGE_MANAGER.tick);
};
  
StageManager.prototype.update = function(dt) {
    if (this._app.stage && this._app.stage.update) {
        this._app.stage.position.x = this._cameraPos.x;
        this._app.stage.position.y = this._cameraPos.y;
        this._app.stage.update(dt);
    }
};

$(document).ready(async () => {
    // Init pixi app view
    let canvasWrapper = $('#canvas_wrapper');
    STAGE_MANAGER = new StageManager(canvasWrapper.width(), canvasWrapper.height());
    await loadGame();
    canvasWrapper.append(STAGE_MANAGER.app.view);
    requestAnimationFrame(STAGE_MANAGER.tick);
    STAGE_MANAGER.resize(canvasWrapper.width(), canvasWrapper.height());
});

$(window).resize(() => {
    let canvasWrapper = $('#canvas_wrapper');
    STAGE_MANAGER.resize(canvasWrapper.width(), canvasWrapper.height());
});

function Stage() {
    const container = new PIXI.Container();
    const tilesContainer = new PIXI.Container();
    tilesContainer.name = 'TilesContainer';
    const itemsContainer = new PIXI.Container();
    itemsContainer.name = 'ItemsContainer';
    const items = [];

    container.addChild(tilesContainer);
    container.addChild(itemsContainer);

    container.update = function(dt) {
        items.forEach((item) => {
            item.update();
        });
    }

    container.drawTile = function(img, x, y) {
        const foundTile = tilesContainer.getChildByName((x.toString() + y.toString()));
        if (foundTile) {
            foundTile.texture = img;
            return;
        }
        const tile = new PIXI.Sprite(img);
        tile.name = (x.toString() + y.toString());
        tile.x = x;
        tile.y = y;
        tilesContainer.addChild(tile);
    }

    container.addItem = (item) => {
        items.push(item);
        itemsContainer.addChild(item.sprite);
    }

    container.removeItem = (item) => {
        const index = items.indexOf(item);
        if (index !== -1) {
            itemsContainer.removeChild(item.sprite);
            items.splice(index, 1);
        }
    }

    return container;
}