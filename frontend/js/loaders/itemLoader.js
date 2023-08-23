itemsList = []

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

function updateInventory(inventory) {
    let count = 1;
    inventory.split(",").forEach(function (element) {

        let table = "<td><img src=" + itemsList[element]['img'] + ` title="${itemsList[element]['desc']}" ></td><h2 class="count">${count}</h2>`;
        document.getElementById('table_' + count).innerHTML = table;
        count++;
    });
}

function removeItem(id, x, y) {
    for (index = 0; index < items.length; index++) {
        item = items[index];
        if (item.x == x && item.y == y && item.id == id) {
            items.splice(index, 1);
            updateAll();
            return;
        }
    }
}

function initItemPositions(itemsPositions) {
    console.log(itemsPositions);
    keys = Object.keys(itemsPositions);
    keys.forEach((key) => {
        pos = key.split(",")
        buffer = itemsPositions[key]
        buffer.forEach(function(item) {
            if (typeof item != 'undefined') {
                try {
                    x = parseInt(pos[0]);
                    y = parseInt(pos[1]);
                    items.push(new Item(x, y, item, images[item]["img"]));
                    items[items.length - 1].newPos(x, y);
                } catch(error) {
                    console.error(error);
                    console.log(item);
                    console.log(images[item]);
                }
            }
        });
    });
    console.log(items);
}