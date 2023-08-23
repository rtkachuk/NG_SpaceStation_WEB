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

    return container;
}