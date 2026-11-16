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
theatre.redraw = () => {
    theatre.ctx.clearRect(0, 0, 1000, 1000);
    terrain.drawRays(camera, theatre, 800, 1);

    theatre.ctx.fillStyle = "black";
    theatre.ctx.fillText("Move: WASD", 20, 20);
    theatre.ctx.fillText("Rotate: Arrow Keys", 20, 40);
};

// Interaction
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

const keyboard = new Keyboard();
keyboard.bindValue('ArrowLeft', v => controls.lookLeft = v);
keyboard.bindValue('ArrowRight', v => controls.lookRight = v);
keyboard.bindValue('ArrowUp', v => controls.lookUp = v);
keyboard.bindValue('ArrowDown', v => controls.lookDown = v);
keyboard.bindValue('a', v => controls.left = v);
keyboard.bindValue('d', v => controls.right = v);
keyboard.bindValue('w', v => controls.forward = v);
keyboard.bindValue('s', v => controls.backward = v);
keyboard.bindValue(' ', v => controls.build = v);

setInterval(() => {
    controls.left && camera.strafe(-1);
    controls.right && camera.strafe(1);
    controls.forward && camera.move(1);
    controls.backward && camera.move(-1);
    
    if (controls.lookLeft) { camera.yaw -= 3; }
    if (controls.lookRight) { camera.yaw += 3; }
    if (controls.lookUp) { camera.pitch += 3; }
    if (controls.lookDown) { camera.pitch -= 3; }

    if (controls.build) {
        const x = Math.floor(camera.x);
        const y = Math.floor(camera.y);
        const newAltitude = terrain.getPoint(x, y).altitude + 1;
        const newColor = terrain.getPoint(1024 - x, 1024 - y).color;

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                terrain.setPoint(x - 5 + i, y - 5 + j, newAltitude, newColor);
            }
        }
    }
    
    const minHeight = terrain.getPoint(Math.floor(camera.x), Math.floor(camera.y)).altitude + 20;
    
    if (camera.z < minHeight) {
        camera.z = minHeight;
    } else if (camera.z > minHeight) {
        camera.z--;
    }
    
}, 20);


// Terrain
const camera = new Camera(1024/2, 1024/2, 0, 50, 0, 90);
const terrain = new Terrain(1024, 1024);

const colorImage = new Image(); colorImage.src = './client-examples/media/C1W.png';
const altitudeImage = new Image(); altitudeImage.src = './client-examples/media/D1.png';

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
