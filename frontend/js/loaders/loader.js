function loadItemTextures() {
    return new Promise((res, rej) => {
        const Http = new XMLHttpRequest();
        Http.responseType = "json";
        const url = `http://${extractHost(window.location.href)}:8085/getItems`;
        Http.open("POST", url);
        Http.send();

        Http.onreadystatechange = function () {
            if (Http.readyState == XMLHttpRequest.DONE) {
                dataForImages = Http.response;
                res(dataForImages);
            }
        };

        Http.onerror = function () {
            alert("Ошибка " + Http.response);
            rej(Http.response);
        };
    });
}

function loadItemPositions() {
    return new Promise((res, rej) => {
        const Http = new XMLHttpRequest();
        Http.responseType = "json";
        const url = `http://${extractHost(window.location.href)}:8085/getPositions`;
        Http.open("POST", url);
        Http.send();
    
        Http.onreadystatechange = function () {
            if (Http.readyState == XMLHttpRequest.DONE) {
                itemsPositions = Http.response;
                res(itemsPositions);
            }
        };
        
        Http.onerror = function () {
            alert("Ошибка " + Http.response);
            rej(Http.response);
        };
    });
}

function loadItemData() {
    return new Promise((res, rej) => {
        const Http = new XMLHttpRequest();
        Http.responseType = "json";
        const url = `http://${extractHost(window.location.href)}:8085/getItems`;
        Http.open("POST", url);
        Http.send();
    
        Http.onreadystatechange = async () => {
            if (Http.readyState == XMLHttpRequest.DONE) {
                const loader = PIXI.Assets;
                for (let i = 0; i < Http.response.length; i++) {
                    const item = Http.response;
                    await loader.load(String(item.id), item.img);
                }
                itemsList = Http.response;
                res(Http.response);
            }
        };
        
        Http.onerror = function () {
            alert("Ошибка " + Http.response);
            rej(Http.response);
        };
    });
}

function loadMapData() {
    return new Promise((res, rej) => {
        const Http = new XMLHttpRequest();
        Http.responseType = "json";
        const url = `http://${extractHost(window.location.href)}:8082/map`;
        Http.open("GET", url);
        Http.send();
    
        Http.onreadystatechange = function () {
            if (Http.readyState == XMLHttpRequest.DONE) {
                mapData = Http.response;
                start();
                res(Http.response);
            }
        };
    
        Http.onerror = function () {
            alert("Ошибка " + Http.response);
            rej(Http.response);
        };
    });
}

function updateInventory(inventory) {
    let count = 1;
    inventory.split(",").forEach(function (element) {
        if (element || element != "") { 
            let table = "<td><img src=" + itemsList[element]['img'] + ` title="${itemsList[element]['desc']}" ></td><h2 class="count">${count}</h2>`;
            document.getElementById('table_' + count).innerHTML = table;
            count++;
        }
    });
}

function removeItem(id, x, y) {
    for (index = 0; index < items.length; index++) {
        item = items[index];
        if (item.x == x && item.y == y && item.id == id) {
            gameStage.removeItem(item);
            items.splice(index, 1);
            return;
        }
    }
}

function initItemPositions(itemsPositions) {
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
                    console.debug(item);
                    console.debug(images[item]);
                }
            }
        });
    });
}

function newImage(src) {
    return PIXI.Texture.from(src); // Use PIXI.Texture to create an image resource
}

async function initItemTextures(itemsData) {
    // Iterate through itemsData and add each image to the loader
    itemsData.forEach(function (item) {
        const imageTexture = newImage(item["img"]);
        tileImages[item["pholder"]] = imageTexture;
        item["img"] = imageTexture;
        images[item['id']] = item;
    });
}

async function loadGame() {
    let textures = await loadItemTextures();
    await initItemTextures(textures);
    let itemPositions = await loadItemPositions();
    initItemPositions(itemPositions);
    await loadItemData();
    await loadMapData();
}