/*
    This is an example of a first person controller demonstrating Terrain.js
*/

import Theatre from '../src/Theatre.js';
import Keyboard from '../src/Keyboard.js';
import {Terrain, Camera} from '../src/Terrain.js';

// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 256, 256);
// theatre.origin = "CENTER";
theatre.makeFullScreen();
theatre.shorterDimensionConsistent = true;
theatre.canvas.style.backgroundColor = "rgb(150, 200, 255)";
theatre.ctx.imageSmoothingEnabled = false; //prevent image blurring
theatre.redraw = () => { render(false); }

// Interaction
const keyboard = new Keyboard();
const controls = {
    left: false,
    right: false,
    forward: false,
    backward: false,
    lookLeft: false,
    lookRight: false,
    lookUp: false,
    lookDown: false,
    build: false
}
keyboard.bindValue('ArrowLeft',  v=> controls.lookLeft  =v);
keyboard.bindValue('ArrowRight', v=> controls.lookRight =v);
keyboard.bindValue('ArrowUp',    v=> controls.lookUp    =v);
keyboard.bindValue('ArrowDown',  v=> controls.lookDown  =v);
keyboard.bindValue('a',          v=> controls.left      =v);
keyboard.bindValue('d',          v=> controls.right     =v);
keyboard.bindValue('w',          v=> controls.forward   =v);
keyboard.bindValue('s',          v=> controls.backward  =v);
keyboard.bindValue(' ',          v=> controls.build     =v);

// Game Loop
setInterval(() => {
    
    const x = Math.floor(camera.x);
    const y = Math.floor(camera.y);
    
    const mapIndex = terrain.getPointIndex(x, y);
    const minHeight = terrain.altitudeMap[mapIndex] + 20;
    
    controls.left     && camera.strafe(-1);
    controls.right    && camera.strafe(1);
    controls.forward  && camera.move(1);
    controls.backward && camera.move(-1);
    
    if (controls.lookLeft ) { camera.yaw   -= 3; }
    if (controls.lookRight) { camera.yaw   += 3; }
    if (controls.lookUp   ) { camera.pitch += 3; }
    if (controls.lookDown ) { camera.pitch -= 3; }
    if (controls.build) {
        const newAltitude = terrain.altitudeMap[mapIndex] + 1;
        const newColor = terrain.colorMap[terrain.colorMap.length - mapIndex];

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                terrain.setPoint(x - 5 + i, y - 5 + j, newAltitude, newColor);
            }
        }
    }
    
    if (camera.z < minHeight) { camera.z = minHeight; } // stay above ground
    else if (camera.z > minHeight) { camera.z--; } // gravity
    
}, 20);


// Terrain
const camera = new Camera(1024/2, 1024/2, 0, 50, 0, 90);
const terrain = new Terrain(1024, 1024);

const colorImage = new Image(); colorImage.src = './client-examples/media/C1W.png';
colorImage.onload = () => { terrain.loadColorFromImage(colorImage, "color"); }

const altitudeImage = new Image(); altitudeImage.src = './client-examples/media/D1.png';
altitudeImage.onload = () => { terrain.loadAltitudeFromImage(altitudeImage); }

function render(callAnimationFrame = true) {
    theatre.ctx.clearRect(0, 0, 1000, 1000);
    terrain.drawRays(camera, theatre, 800, 1);

    theatre.ctx.fillStyle = "black";
    theatre.ctx.fillText("Move: WASD", 20, 20);
    theatre.ctx.fillText("Rotate: Arrow Keys", 20, 40);

    callAnimationFrame && requestAnimationFrame(render);
}

render(); // start rendering

// expose as global variables for console testing
globalThis.THEATRE = theatre;
globalThis.TERRAIN = terrain;
globalThis.CAMERA = camera;