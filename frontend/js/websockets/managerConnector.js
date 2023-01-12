let mgrSocket = new WebSocket("ws://127.0.0.1:8083");
let ID = ""

mgrSocket.onopen = function (e) {
  //alert("[open] Connection established");
};

mgrSocket.onmessage = function (event) {
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
  if (msg.includes("ID")) {
    ID = msg.split(/\s+/)[1];
    console.log("ID: " + ID);
  }
  if (msg.includes("KICK")) {
    player = msg.split(/\s+/)[1]
    kick(player);
  }
};

mgrSocket.onclose = function (event) {
  if (event.wasClean) {
    //alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    //alert("[close] Connection died");
  }
};

mgrSocket.onerror = function (error) {
  //alert(`[error] ${error.message}`);
};
