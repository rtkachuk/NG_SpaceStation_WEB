let socket = new WebSocket("ws://127.0.0.1:8081");

socket.onopen = function (e) {
  //alert("[open] Connection established");
};

socket.onmessage = function (event) {
  msg = event.data;
  if (msg.includes("MOVE")) {
    console.log(msg);
    pos = msg.split(/\s+/);
    updatePlayerPos(pos[1], pos[2])
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
