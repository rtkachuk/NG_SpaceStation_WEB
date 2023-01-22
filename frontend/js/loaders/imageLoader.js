//imageNames = []
imagePaths = []
imagePlaceholders = []

function loadImages() {
    const Http = new XMLHttpRequest();
    Http.responseType = "json";
    const url = `http://${serviceAddress}:8085/getImages`;
    Http.open("POST", url);
    Http.send();
  
    Http.onreadystatechange = function () {
        if (Http.readyState == XMLHttpRequest.DONE) {
            dataForImages = Http.response;
            initImages(dataForImages);
        }
    };
    
    Http.onerror = function () {
        alert("Ошибка " + Http.response);
    };
}

function newImage(src){
    var tmp = new Image();
    tmp.src = src;
    return tmp
}

function initImages(imagesData) {
    imagesData.forEach(function (image) {
        imagePlaceholders[image["pholder"]] = newImage(image["img"]);
        image["img"] = newImage(image["img"]);
        images[image['id']] = image;
    });
    loadItemPositions();
    loadItemInformation();
    /*imagesData.forEach(function(imageData) {
        //imageNames += imagePath.split("/").pop().split(".")[0]; // "/items/null.png" -> null.png -> null
       images.push(imageData);
    });*/
}

loadImages();
