tileImages = [];
mapData = [];
images = {};
items = [];

function loadItems() {
    const Http = new XMLHttpRequest();
    Http.responseType = "json";
    const url = `http://${extractHost(window.location.href)}:8085/getItems`;
    Http.open("POST", url);
    Http.send();

    Http.onreadystatechange = function () {
        if (Http.readyState == XMLHttpRequest.DONE) {
            dataForImages = Http.response;
            initItems(dataForImages);
        }
    };

    Http.onerror = function () {
        alert("Ошибка " + Http.response);
    };
}

function loadItemPositions() {
    const Http = new XMLHttpRequest();
    Http.responseType = "json";
    const url = `http://${extractHost(window.location.href)}:8085/getPositions`;
    Http.open("POST", url);
    Http.send();
  
    Http.onreadystatechange = function () {
        if (Http.readyState == XMLHttpRequest.DONE) {
            itemsPositions = Http.response;
            initItemPositions(itemsPositions);
        }
    };
    
    Http.onerror = function () {
        alert("Ошибка " + Http.response);
    };
}

function loadItemInformation() {
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
        }
    };
    
    Http.onerror = function () {
        alert("Ошибка " + Http.response);
    };
}

function loadMap() {
    const Http = new XMLHttpRequest();
    Http.responseType = "json";
    const url = `http://${extractHost(window.location.href)}:8082/map`;
    Http.open("GET", url);
    Http.send();
  
    Http.onreadystatechange = function () {
      if (Http.readyState == XMLHttpRequest.DONE) {
        mapData = Http.response;
        console.debug(mapData);
        start();
      }
    };
  
    Http.onerror = function () {
      alert("Ошибка " + Http.response);
    };
}

function newImage(src) {
    return PIXI.Texture.from(src); // Use PIXI.Texture to create an image resource
}

function initItems(itemsData) {
    const loader = PIXI.Assets;
    console.debug('Items data', itemsData);

    // Iterate through itemsData and add each image to the loader
    itemsData.forEach(function (item) {
        const imageTexture = newImage(item["img"]);
        tileImages[item["pholder"]] = imageTexture;
        item["img"] = imageTexture;
        images[item['id']] = item;
    });

    loadMap();
    loadItemPositions();
    loadItemInformation();
}