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
    theatre.ctx.clearRect(0, 0, 1000, 1000);
    theatre.ctx.drawImage(colorImage, 0, 0);
    terrain.drawRays(camera, theatre, maxRayDepth, maxRayDepth - 0.001);
};

// Interaction
theatre.addEventListener("pointerdown", pointerdown);

let maxRayDepth = 1;
function pointerdown(event) {
    let {x, y} = theatre.getEventCoordinates(event);

    camera.x = x;
    camera.y = y;

    maxRayDepth++;
    camera.z = terrain.getPoint(Math.floor(x), Math.floor(y)).altitude + 20;

    theatre.redraw();
}


// Terrain
const camera = new Camera(0, 0, 50, 180, 0, 90);
const terrain = new Terrain(1024, 1024);

const colorImage = new Image(); colorImage.src = './examples/media/C1W.png';
const altitudeImage = new Image(); altitudeImage.src = './examples/media/D1.png';

colorImage.onload = () => {

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

altitudeImage.onload = () => {

    const canvas = new OffscreenCanvas(1024, 1024);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(altitudeImage, 0, 0);
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