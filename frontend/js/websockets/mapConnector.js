let mapSocket = new WebSocket("ws://127.0.0.1:8082");

mapSocket.onopen = function (e) {
  console.log("Map loading started")
};

mapSocket.onmessage = function (event) {
  msg = event.data;
  if (msg.includes("MAP")) {
    line = msg.split(/\s+/)[1];
    row = line.split('');
    mapData.push(row)
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
