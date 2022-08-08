let socket = new WebSocket("ws://127.0.0.1:8081");
let ID = ""

socket.onopen = function (e) {
  //alert("[open] Connection established");
};

socket.onmessage = function (event) {
  msg = event.data;
  if (msg.includes("MOVE")) {
    console.log(msg);
    pos = msg.split(/\s+/);
    if (pos[4] != "") {
      updateMap(pos[5], pos[6], pos[4]);
    }
    updatePlayerPos(pos[0], pos[2], pos[3]) // ID, x, y
  }
  if (msg.includes("ID")) {
    ID = msg.split(/\s+/)[1];
    console.log("ID: " + ID);
  }
  if (msg.includes("KICK")) {
    player = msg.split(/\s+/)[1]
    kick(player);
  }
  if (msg.includes("UPD")) {
    item = msg.split(/\s+/)
    console.log (item);
    updateMap(item[1], item[2], item[3]);
  }
};

socket.onclose = function (event) {
  if (event.wasClean) {
    //alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    //alert("[close] Connection died");
  }
};

socket.onerror = function (error) {
  //alert(`[error] ${error.message}`);
};
