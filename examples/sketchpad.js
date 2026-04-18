/*
    This is a simple program to showcase the power of the Theatre module.
    It is a simple sketchpad program with a dynamic resolution written in about 50 lines.
*/

import Theatre from '../src/Theatre.js';

// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 800, 800);
const ctx = theatre.ctx;
theatre.origin = "CENTER";
theatre.makeFullScreen();
theatre.shorterDimensionConsistent = true;
theatre.canvas.style.backgroundColor = "#f8f9fa";
theatre.ctx.imageSmoothingEnabled = false; //prevent image blurring
theatre.redraw = redrawLines;

// Interaction
theatre.addEventListener("pointerdown", () => {mouseDown = true});
theatre.addEventListener("pointerup", () => {mouseDown = false});
theatre.addEventListener("pointermove", addLineSegment);

// State
let mouseDown = false;
let newLine = false;
const lineSegments = [];

function addLineSegment(event) {
    let {x, y} = theatre.getEventCoordinates(event);
    
    if (!mouseDown) {
        ctx.moveTo(x, y);
        newLine = true;
        return;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    lineSegments.push({x, y, newLine});
    newLine = false;
}

function redrawLines() {
    
    ctx.beginPath;
    for (let lineSegment of lineSegments) {
        lineSegment.newLine && ctx.moveTo(lineSegment.x, lineSegment.y);
        !lineSegment.newLine && ctx.lineTo(lineSegment.x, lineSegment.y);
    }

    ctx.stroke();
}

globalThis.THEATRE = theatre; // expose as global variable for console testing