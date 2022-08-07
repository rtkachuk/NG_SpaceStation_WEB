document.addEventListener('keyup', (e) => {
    switch(e.code) {
        case "KeyW": socket.send("MOVE W"); break;
        case "KeyS": socket.send("MOVE S"); break;
        case "KeyA": socket.send("MOVE A"); break;
        case "KeyD": socket.send("MOVE D"); break;
        case "KeyT": offsetUp(); break;
        case "KeyG": offsetDown(); break;
        case "KeyF": offsetLeft(); break;
        case "KeyH": offsetRight(); break;
    }
})