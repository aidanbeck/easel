/*
    This is a simple program to showcase the power of the Overlap module.
    It is a simple shape drawing program.
*/

import Theatre from './src/Theatre.js';
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
theatre.redraw = renderShapes;

// State
let selectedShape = null;
let drawingShape = null;
const shapes = [];

// Interaction
theatre.addEventListener("pointerdown", mouseDown);
theatre.addEventListener("pointermove", mouseMove);
theatre.addEventListener("pointerup", mouseUp);
theatre.addEventListener("contextmenu", (e) => e.preventDefault());

function mouseDown(event) {

    let {x, y} = theatre.getEventCoordinates(event);

    for (let i = shapes.length - 1; i >= 0; i--) {
        const mousePoint = new Point(x, y);
        if (mousePoint.overlaps(shapes[i])) {
            selectedShape = shapes[i];
            shapes.push(selectedShape); // move to top of stack when selected
            mouseMove(event);
            return;
        }
    }

    // if not selecting a shape
    if (event.button === 0) { // left click
      drawingShape = new Rectangle(x, y, 0, 0);
    } else {
        drawingShape = new Circle(x, y, 0);
    }
}

function mouseMove(event) {

    let {x, y} = theatre.getEventCoordinates(event);

    selectedShape && moveSelectedShape(x, y);
    drawingShape && moveDrawingShape(x, y);
}

function moveSelectedShape(x, y) {
    selectedShape.x = x;
    selectedShape.y = y;

    // center rectangle
    if (selectedShape instanceof Rectangle) {
        selectedShape.x -= selectedShape.w / 2;
        selectedShape.y -= selectedShape.h / 2;
    }
}

function moveDrawingShape(x, y) {
    
    if (drawingShape instanceof Circle) {
        drawingShape.r = drawingShape.distance(drawingShape, {x: x, y: y});
    }

    if (drawingShape instanceof Rectangle) {
        drawingShape.w = x - drawingShape.x;
        drawingShape.h = y - drawingShape.y;
    }
}

function mouseUp(event) {

    if (drawingShape) {
        if (drawingShape instanceof Rectangle) {
            drawingShape.normalizeDimensions();
        }
        shapes.push(drawingShape);
    }

    selectedShape = null;
    drawingShape = null;
}

function renderShapes() {
    
    ctx.clearRect(-theatre.canvas.width/2, -theatre.canvas.height/2, theatre.canvas.width, theatre.canvas.height);
        
    for (let i = 0; i < shapes.length; i++) {

        // color if colliding
        ctx.fillStyle = `darkblue`;
        for (let otherShape of shapes) {
            if (shapes[i] == otherShape) { continue; }
            if (shapes[i].overlaps(otherShape)) { ctx.fillStyle = `crimson`; }
        }

        drawShape(shapes[i]);
        drawShape(shapes[i], false);
    }

    drawingShape && drawShape(drawingShape, false);
}

function drawShape(shape, fill = true) {
    ctx.beginPath();
    if (shape instanceof Circle) {
        ctx.arc(shape.x, shape.y, shape.r, 0, Math.PI * 2);
        fill && ctx.fill();
        !fill && ctx.stroke();
    }
    if (shape instanceof Rectangle) {
        fill && ctx.fillRect(shape.x, shape.y, shape.w, shape.h);
        !fill && ctx.strokeRect(shape.x, shape.y, shape.w, shape.h); 
    }
}

setInterval(renderShapes, 20);

globalThis.SHAPES = shapes; // expose as global variable for console testing