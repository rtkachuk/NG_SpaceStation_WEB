let mgrSocket = new WebSocket(`ws://${serviceAddress}:8083`);
let ID = ""

mgrSocket.onopen = function (e) {
  //alert("[open] Connection established");
};

mgrSocket.onmessage = function (event) {
  msg = event.data;
  console.log(msg);
  if (msg.includes("MOVE")) {
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
    updatePlayerPos(pos[0], pos[2], pos[3]) // ID, x, y
    if (pos[4] != "") {
      updateMap(pos[5], pos[6], pos[4]);
    }
  }
  if (msg.includes("ID")) {
    ID = msg.split(/\s+/)[1];
    console.log("ID: " + ID);
  }
  if (msg.includes("KICK")) {
    player = msg.split(/\s+/)[1]
    kick(player);
  }
  if (msg.includes("INV")) {
    data = msg.split(/\s+/);
    console.log ("Inventory: " + data);
    updateInventory(data[1]);
  }
  if (msg.includes("WDEL")) { // Delete item from world
    data = msg.split(/\s+/);
    console.log ("Remove item from world: " + data);
    removeItem(data[1], data[2], data[3]);
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
