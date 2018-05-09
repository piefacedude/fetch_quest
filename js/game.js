///////////////////////////////////////////////
// FetchQuest Javascript
// Created By Guy Witherow
// "supple joints" - Mary Shelly: Frankenstein
///////////////////////////////////////////////

//Canvas Creation
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;
document.body.appendChild(canvas);

//Game loop
var lastTime;
function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimFrame(main);
};
