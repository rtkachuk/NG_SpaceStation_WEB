let cSize = 40;

var players = {}

var floor = new Image();
floor.src = './images/floor.png';

var playerModel = new Image();
playerModel.src = './images/player.png';

function start() {
    map.start();
    initMap();
}

var map = {
    canvas: document.getElementById("myCanvas"),
    start: function() {
        this.context = this.canvas.getContext("2d");
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        initMap();
        ctx.stroke();
    }
}

function drawTile(x, y) {
    ctx = map.context;
    //ctx.moveTo(x,y);
    ctx.drawImage(floor, x, y, cSize,cSize);
}

function initMap() {
    for (let y = 0; y<20; y++) {
        for (let x = 0; x<20; x++) {
            drawTile(x*cSize, y*cSize);
        }
    }
}

function component (x ,y, color) {
    this.width = cSize;
    this.height = cSize;
    this.x = 0;
    this.y = 0;
    this.update = function() {
        ctx = map.context;
        ctx.drawImage(playerModel, this.x, this.y, cSize,cSize);
        //ctx.fillStyle = color;
        //ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function(x, y) {
        this.x = x;
        this.y = y;
    }
}

function updatePlayerPos(id, x, y) {
    console.log("ID: " + id);
    console.log("x: " + x);
    console.log("y: " + y);
    map.clear();
    if (players.hasOwnProperty(id) == false) {
        players[id] = new component(50, 50, "red");
    }
    player = players[id];
    player.newPos(x*cSize, y*cSize);
    player.update();

    for (const [key, value] of Object.entries(players)) {
        value.update()
        console.log("TEST")
    }
}

function kick(id) {
    delete players[id];
}
