let imgs=["S", "P", "A", "C", "E","DOT", "T", "I", "O", "N", "S2", "T2", "A2"];
setInterval(function() {
    let randomElement = Math.floor(Math.random()*imgs.length);
    let randomValue = imgs[randomElement];

    let str = document.getElementById(randomValue).getAttribute('src').substr(-5, 1);
    if (str === str.toUpperCase()) {
        document.getElementById(randomValue).src='./images/buttons/'+ randomValue.toLowerCase().replace(/[0-9]/g, '') +'.png';
    } else {
        document.getElementById(randomValue).src='./images/buttons/'+ randomValue.toUpperCase().replace(/[0-9]/g, '') +'.png';
    }
}, 100);
