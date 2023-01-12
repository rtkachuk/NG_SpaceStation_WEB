function loadImages() {
    const Http = new XMLHttpRequest();
    Http.responseType = "json";
    const url = "http://127.0.0.1:8085/getImagesList";
    Http.open("POST", url);
    Http.send();
  
    Http.onreadystatechange = function () {
        if (Http.readyState == XMLHttpRequest.DONE) {
            imagesList = Http.response;
            console.log(imagesList);
            initImages(imagesList);
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

function initImages(imagePaths) {
    imagePaths.forEach(function(imagePath) {
        imageName = imagePath.split("/").pop().split(".")[0]; // "/items/null.png" -> null.png -> null
        images[imageName] = newImage(imagePath);
    });

    console.log(images);
}

loadImages();