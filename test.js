/*
    This is a simple program to showcase the power of the Velocity module.
    It is a simple physics simulation written in about 70 lines.
*/

import Theatre from './src/Theatre.js';
import Velocity from './src/Velocity.js';
import { Point, Circle, Rectangle } from './src/Shape.js';

// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 800, 800);
const ctx = theatre.ctx;
theatre.origin = "CENTER";
theatre.makeFullScreen();
theatre.shorterDimensionConsistent = true;
theatre.canvas.style.backgroundColor = "rgb(255, 255, 255)";
theatre.ctx.imageSmoothingEnabled = false; //prevent image blurring
theatre.redraw = renderObjects;

// State
let selectedShape = null;
const shapes = [];

// Interaction
theatre.addEventListener("pointerdown", mouseDown);
theatre.addEventListener("pointerup", mouseUp);
theatre.addEventListener("pointermove", mouseMove);

function mouseDown(event) {

    let {x, y} = theatre.getEventCoordinates(event);

    for (let shape of shapes) {
        let mousePoint = new Point(x, y);
        if (mousePoint.overlaps(shape)) {
            selectedShape = shape;
            return;
        }
    }

    shapes.push(new Circle(x, y, 20));
}

function mouseUp() {}

function mouseMove() {}

function renderShapes() {
    
    // clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(-theatre.canvas.width/2, -theatre.canvas.height/2, theatre.canvas.width, theatre.canvas.height);
    
    // draw circles
    ctx.fillStyle = "darkblue";
    for (let shape of shapes) {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.r, 0, Math.PI * 2); 
        ctx.fill();
    }
}

setInterval(renderShapes, 20);

globalThis.SHAPES = shapes; // expose as global variable for console testing