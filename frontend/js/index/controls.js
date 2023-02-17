document.addEventListener('keydown', (e) => {
    if (e.ctrlKey) {
        switch(e.code) {
            case "KeyW": mgrSocket.send("PICK W"); break;
            case "KeyS": mgrSocket.send("PICK S"); break;
            case "KeyA": mgrSocket.send("PICK A"); break;
            case "KeyD": mgrSocket.send("PICK D"); break;
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
