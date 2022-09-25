let connSocket = new WebSocket("ws://127.0.0.1:8083");

connSocket.onopen = function (e) {
  //alert("[open] Connection established");
};

connSocket.onmessage = function (event) {
  msg = event.data;
  if (msg.includes("MOVE")) {
    console.log(msg);
    pos = msg.split(/\s+/);
    updatePlayerPos(pos[0], pos[2], pos[3]) // ID, x, y
  }
  if (msg.includes("UPD")) {
    item = msg.split(/\s+/)
    console.log (item);
    updateMap(item[1], item[2], item[3]);
  }
  if (msg.includes("CLOSE")) {
    console.log(msg);
    pos = msg.split(/\s+/);
    if (pos[4] != "") {
      updateMap(pos[5], pos[6], pos[4]);
    }
    updatePlayerPos(pos[0], pos[2], pos[3]) // ID, x, y
  }

};

connSocket.onclose = function (event) {
  if (event.wasClean) {
    //alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    //alert("[close] Connection died");
  }
};

connSocket.onerror = function (error) {
  //alert(`[error] ${error.message}`);
};
