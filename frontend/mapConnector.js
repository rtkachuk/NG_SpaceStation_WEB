let mapSocket = new WebSocket("ws://192.168.0.112:8082");

mapSocket.onopen = function (e) {
  console.log("Map loading started")
};

mapSocket.onmessage = function (event) {
  msg = event.data;
  if (msg.includes("MAP")) {
    line = msg.split(/\s+/);
    mapData.push(line[1])
  }
  if (msg.includes("END")) {
    start();
  }
};

mapSocket.onclose = function (event) {
  if (event.wasClean) {
    //alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    //alert("[close] Connection died");
  }
};

mapSocket.onerror = function (error) {
  //alert(`[error] ${error.message}`);
};
