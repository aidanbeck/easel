/*
    This is a simple program to showcase the power of the Theatre module.
    It is a simple sketchpad program with a dynamic resolution written in about 50 lines.
*/

import Theatre from './src/Theatre.js';
import Velocity from './src/Velocity.js';

// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 800, 800);
const ctx = theatre.ctx;
theatre.origin = "CENTER";
theatre.makeFullScreen();
theatre.shorterDimensionConsistent = true;
theatre.canvas.style.backgroundColor = "#f8f9fa";
theatre.ctx.imageSmoothingEnabled = false; //prevent image blurring
theatre.redraw = renderObjects;

// Interaction
theatre.addEventListener("click", addObject);

// State
const objects = [];

function addObject(event) {
    let {x, y} = theatre.getEventCoordinates(event);
    
    const circle = {
        x: x,
        y: y,
        r: 10,
        v: new Velocity(Math.random() * 10 - 5, Math.random() * 10 - 5)
    }
    
    objects.push(circle);
    renderObjects();
}

function renderObjects() {
    
    // clear canvas (transparent, for velocity effect)
    ctx.fillStyle = 'rgb(255,255,255,0.3)';
    ctx.fillRect(-theatre.canvas.width/2, -theatre.canvas.height/2, theatre.canvas.width, theatre.canvas.height);

    for (let object of objects) {
        ctx.beginPath();
        ctx.arc(object.x, object.y, object.r, 0, Math.PI * 2);
        ctx.fillStyle = "darkblue";
        ctx.fill();
        ctx.closePath();
    }
}

function physics() {

    for (let object of objects) {
        object.v.moveObject(object);
    }

    renderObjects();
}

setInterval(physics, 25);

globalThis.OBJECTS = objects; // expose as global variable for console testing