/*
    This is a sandbox for testing new Easel modules.
*/

import Theatre from '../src/Theatre.js';
import {Terrain, Camera} from '../src/Terrain.js';

// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 1080, 720);
// theatre.origin = "CENTER";
theatre.makeFullScreen();
theatre.shorterDimensionConsistent = true;
theatre.canvas.style.backgroundColor = "rgb(255, 255, 255)";
theatre.ctx.imageSmoothingEnabled = false; //prevent image blurring
theatre.redraw = () => {
    terrain.drawRays(camera, theatre);
};

// Interaction
theatre.addEventListener("pointerdown", pointerdown);
theatre.addEventListener("pointermove", pointermove);

function pointermove(event) {

}

function pointerdown(event) {

}


// Terrain
const camera = new Camera(10, 20, 10, 180, 0, 90);
const terrain = new Terrain(1000, 1000);

const colorMap = new Image(); colorMap.src = './examples/media/C1W.png';
const depthMap = new Image(); depthMap.src = './examples/media/D1.png';

depthMap.onload = () => {

    for (i = 0; i < 1000 * 1000; i++) {
        
    }

}


for (let x = 0; x < 1000; x++) {
    for (let y = 0; y < 1000; y++) {
        terrain.setPoint(x, y, 0, `rgb(${x / 5},100,${y / 5})`);
    }
}


// expose as global variables for console testing
globalThis.THEATRE = theatre;
globalThis.TERRAIN = terrain;
globalThis.CAMERA = camera;