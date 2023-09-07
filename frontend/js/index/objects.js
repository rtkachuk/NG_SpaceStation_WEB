function Item(x, y, id, image) {
    this.sprite = new PIXI.Sprite(image);
    this.width = cSize;
    this.height = cSize;
    this.id = id;
    this.x = x;
    this.y = y;
    this.update = () => {
        this.sprite.position = new PIXI.Point(this.x * cSize, this.y * cSize);
    };
    this.clear = function() {
      this.sprite.parent.removeChild(this.sprite);
    }
    this.newPos = function (x, y) {
      this.x = x;
      this.y = y;
    };
}