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
const terrain = new Terrain(1024, 1024);

const colorImage = new Image(); colorImage.src = './examples/media/C1W.png';
const altitudeImage = new Image(); altitudeImage.src = './examples/media/D1.png';

colorMap.onload = () => {

    const canvas = new OffscreenCanvas(1024, 1024);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(colorImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, 1024, 1024).data;

    for (let i = 0; i < 1024 * 1024; i++) {

        let indexNumber = Math.floor (i / 4);

        let r = imageData[i]; i++;
        let g = imageData[i]; i++;
        let b = imageData[i]; i++;   

        terrain.colorMap[indexNumber] = `rgb(${r},${g},${b})`;
    }
}

depthMap.onload = () => {

    const canvas = new OffscreenCanvas(1024, 1024);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(colorImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, 1024, 1024).data;

    for (let i = 0; i < 1024 * 1024; i += 4) {

        let indexNumber = Math.floor (i / 4);
        let r = imageData[i]; 

        terrain.altitudeMap[indexNumber] = r;
    }
}

// expose as global variables for console testing
globalThis.THEATRE = theatre;
globalThis.TERRAIN = terrain;
globalThis.CAMERA = camera;