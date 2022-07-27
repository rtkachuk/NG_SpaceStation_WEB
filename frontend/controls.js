document.addEventListener('keyup', (e) => {
    if (e.code === "KeyW")          socket.send("MOVE W")
    else if (e.code === "KeyS")     socket.send("MOVE S")
    else if (e.code === "KeyA")     socket.send("MOVE A")
    else if (e.code === "KeyD")     socket.send("MOVE D")
})