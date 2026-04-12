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
theatre.redraw = renderShapes;

// State
let selectedShape = null;
let drawingShape = null;
const shapes = [];

// Interaction
theatre.addEventListener("pointerdown", mouseDown);
theatre.addEventListener("pointerup", mouseUp);
theatre.addEventListener("pointermove", mouseMove);

function mouseDown(event) {

    let {x, y} = theatre.getEventCoordinates(event);

    for (let shape of shapes) {
        const mousePoint = new Point(x, y);
        if (mousePoint.overlaps(shape)) {
            selectedShape = shape;
            mouseMove(event);
            return;
        }
    }

    // if not selecting a shape
    if (shapes[shapes.length - 1] instanceof Circle) {
        drawingShape = new Rectangle(x, y, 0, 0);
    } else {
        drawingShape = new Circle(x, y, 0);
    }
    

    
}

function mouseUp(event) {
    let {x, y} = theatre.getEventCoordinates(event);

    if (drawingShape != null) {
        if (drawingShape instanceof Rectangle) {
            drawingShape.normalizeDimensions();
        }
        shapes.push(drawingShape);
    }

    selectedShape = null;
    drawingShape = null;
}

function mouseMove(event) {

    let {x, y} = theatre.getEventCoordinates(event);

    if (selectedShape != null) {
        selectedShape.x = x;
        selectedShape.y = y;

        if (selectedShape instanceof Rectangle) {
            selectedShape.x -= selectedShape.w / 2;
            selectedShape.y -= selectedShape.h / 2;
        }
    }

    if (drawingShape != null) {
        const mousePoint = new Point(x, y);
        
        if (drawingShape instanceof Circle) {
            drawingShape.r = drawingShape.distance(drawingShape, mousePoint);
        }

        if (drawingShape instanceof Rectangle) {
            drawingShape.w = mousePoint.x - drawingShape.x;
            drawingShape.h = mousePoint.y - drawingShape.y;
        }
        
    }

    
    
}

function renderShapes() {
    
    // clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(-theatre.canvas.width/2, -theatre.canvas.height/2, theatre.canvas.width, theatre.canvas.height);
    

    // draw circles
    
    for (let shape of shapes) {

        ctx.fillStyle = "darkblue";
        ctx.strokeStyle = "black";

        // color if colliding
        for (let otherShape of shapes) {
            if (shape == otherShape) { continue; }
            if (shape.overlaps(otherShape)) { ctx.fillStyle = "crimson"; }
        }

    
        ctx.beginPath();

        if (shape instanceof Circle) {
            ctx.arc(shape.x, shape.y, shape.r, 0, Math.PI * 2); 
            ctx.fill();
        }
        if (shape instanceof Rectangle) {
            ctx.fillRect(shape.x, shape.y, shape.w, shape.h); 
        }

        
    }

    // drawingShape
    if (drawingShape != null) {
        ctx.beginPath();
        if (drawingShape instanceof Circle) {
            ctx.arc(drawingShape.x, drawingShape.y, drawingShape.r, 0, Math.PI * 2); 
            ctx.stroke();
        }
        if (drawingShape instanceof Rectangle) {
            ctx.strokeRect(drawingShape.x, drawingShape.y, drawingShape.w, drawingShape.h); 
        }
    }
    
}

setInterval(renderShapes, 20);

globalThis.SHAPES = shapes; // expose as global variable for console testing