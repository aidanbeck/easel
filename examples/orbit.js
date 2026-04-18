/*
    This is a simple program to showcase the power of the Velocity module.
    It is a simple physics simulation written in about 70 lines.
*/

import Theatre from '../src/Theatre.js';
import Velocity from '../src/Velocity.js';

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

// Interaction
theatre.addEventListener("click", addObject);

// State
const objects = [];

function addObject(event) {
    let {x, y} = theatre.getEventCoordinates(event);
    
    objects.push({
        x: x,
        y: y,
        r: 10,
        v: new Velocity(0,0)
    });
}

function renderObjects() {
    
    // clear canvas
    ctx.fillStyle = 'rgb(255, 255, 255, 0.5)'; // transparent color for trailing effect
    ctx.fillRect(-theatre.canvas.width/2, -theatre.canvas.height/2, theatre.canvas.width, theatre.canvas.height);
    
    // draw circles
    ctx.fillStyle = "darkblue";
    for (let object of objects) {
        ctx.beginPath();
        ctx.arc(object.x, object.y, object.r, 0, Math.PI * 2); 
        ctx.fill();
    }}

function physics() {

    for (let object of objects) {

        object.v.moveObject(object);
        object.v.applyFriction(0.9999);

        // relative gravity
        for (let attractingObject of objects) {
            if (object == attractingObject) { continue; }
            const relativePull = new Velocity(0.1, 0);
            relativePull.pointTowards(object, attractingObject);
            object.v.addVelocity(relativePull);
        }     
    }

    renderObjects();
}

setInterval(physics, 20);

globalThis.OBJECTS = objects; // expose as global variable for console testing