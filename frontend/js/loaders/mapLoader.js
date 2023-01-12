function loadMap() {
  const Http = new XMLHttpRequest();
  Http.responseType = "json";
  const url = "http://127.0.0.1:8082/map";
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = function () {
    if (Http.readyState == XMLHttpRequest.DONE) {
      mapData = Http.response;
      console.log(mapData);
      start();
    }
  };

  Http.onerror = function () {
    alert("Ошибка " + Http.response);
  };
}

loadMap();
