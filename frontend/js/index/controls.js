document.addEventListener('keydown', (e) => {
    if (e.shiftKey) {
        switch(e.code) {
            case "KeyW": offsetUp(); break;
            case "KeyS": offsetDown(); break;
            case "KeyA": offsetLeft(); break;
            case "KeyD": offsetRight(); break;
        }
    } else {
        switch(e.code) {
            case "KeyW": mgrSocket.send("MOVE W"); break;
            case "KeyS": mgrSocket.send("MOVE S"); break;
            case "KeyA": mgrSocket.send("MOVE A"); break;
            case "KeyD": mgrSocket.send("MOVE D"); break;
        }
    }
})