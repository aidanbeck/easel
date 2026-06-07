/*
    This is a sandbox for testing new Easel modules.
*/

import Theatre from '../src/Theatre.js';
import {Terrain, Camera} from '../src/Terrain.js';

// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 256, 256);
// theatre.origin = "CENTER";
theatre.makeFullScreen();
theatre.shorterDimensionConsistent = true;
theatre.canvas.style.backgroundColor = "rgb(255, 255, 255)";
theatre.ctx.imageSmoothingEnabled = false; //prevent image blurring
theatre.redraw = () => {
    theatre.ctx.clearRect(0, 0, 1000, 1000);
    // theatre.ctx.drawImage(colorImage, 0, 0);
    terrain.drawRays(camera, theatre, 800, 1);
    theatre.ctx.fillRect(camera.x/4 - 2, camera.y/4 - 2, 3, 3); // draw camera position;
};

// Interaction
theatre.addEventListener("pointermove", pointermove);
theatre.addEventListener("pointerdown", pointerdown);


function pointermove(event) {
    let {x, y} = theatre.getEventCoordinates(event);

    x *= 4;
    y *= 4;

    camera.x = x ;
    camera.y = y;
    camera.z = terrain.getPoint(Math.floor(x), Math.floor(y)).altitude + 20;
}

function pointerdown(event) {
    let {x, y} = theatre.getEventCoordinates(event);

    x *= 4;
    y *= 4;

    x = Math.floor(x);
    y = Math.floor(y);
    
    let newAltitude = terrain.getPoint(x, y).altitude + 10;
    let newColor = terrain.getPoint(1024 - x, 1024 - y).color;

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            terrain.setPoint(x - 5 + i, y - 5 + j, newAltitude, newColor);
        }
    }

}


// Terrain
const camera = new Camera(0, 0, 50, 50, 0, 90);
const terrain = new Terrain(1024, 1024);

const colorImage = new Image(); colorImage.src = './examples/media/C1W.png';
const altitudeImage = new Image(); altitudeImage.src = './examples/media/D1.png';

colorImage.onload = () => {

    const canvas = new OffscreenCanvas(1024, 1024);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(colorImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, 1024, 1024).data;

    for (let i = 0; i < imageData.length; i++) {

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

    for (let i = 0; i < imageData.length; i += 4) {

        let indexNumber = Math.floor (i / 4);
        let r = imageData[i]; 

        terrain.altitudeMap[indexNumber] = r;
    }
}

setInterval(theatre.redraw, 10);

// expose as global variables for console testing
globalThis.THEATRE = theatre;
globalThis.TERRAIN = terrain;
globalThis.CAMERA = camera;