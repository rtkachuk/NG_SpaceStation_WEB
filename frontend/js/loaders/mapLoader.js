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
    }
  };

  Http.onerror = function () {
    alert("Ошибка " + Http.response);
  };
}

loadMap();
