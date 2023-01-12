document.addEventListener('keyup', (e) => {
    switch(e.code) {
        case "KeyW": mgrSocket.send("MOVE W"); break;
        case "KeyS": mgrSocket.send("MOVE S"); break;
        case "KeyA": mgrSocket.send("MOVE A"); break;
        case "KeyD": mgrSocket.send("MOVE D"); break;
        case "KeyT": offsetUp(); break;
        case "KeyG": offsetDown(); break;
        case "KeyF": offsetLeft(); break;
        case "KeyH": offsetRight(); break;
    }
})