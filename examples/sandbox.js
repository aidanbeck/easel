/*
    This is a sandbox for testing Easel modules.
    Everything is attached to the window object, so it can easily be modified with the developer console.
*/

import Theatre from '../src/Theatre.js';
import Texture from '../src/Texture.js';
import Velocity from '../src/Velocity.js';
import { Point, Circle, Rectangle } from '../src/Shape.js';
import { Card, Deck } from '../src/Card.js';
import { Terrain, Camera } from '../src/Terrain.js';
import PhysicsObject from '../src/PhysicsObject.js';
import Binds from '../src/Binds.js';

// Theatre Setup
window.canvasElement = document.getElementById("theatre");
window.theatre = new Theatre(canvasElement, 800, 800);
window.ctx = theatre.ctx;
theatre.origin = "CENTER";
theatre.makeFullScreen();
theatre.shorterDimensionConsistent = true;
theatre.canvas.style.backgroundColor = "#f8f9fa";
theatre.ctx.imageSmoothingEnabled = false; //prevent image blurring
theatre.redraw = () => {};


// Class Instances
window.texture = new Texture('./examples/media/animation.bmp', 9, -4, -14);
window.point = new Point(0, 0);
window.rectangle = new Rectangle(0, 0, 10, 10);
window.circle = new Circle(0, 0, 10);
window.velocity = new Velocity(1, 1);
window.physicsObject = new PhysicsObject(rectangle, velocity);
// window.binds = new Binds();


// Interaction
window.pointerDown = function(e) {}
window.pointerUp = function(e) {}
window.pointerMove = function(e) {}
window.isPointerDown = false;

theatre.addEventListener("pointerdown", (e) => pointerDown(e) );
theatre.addEventListener("pointerup",   (e) => pointerUp(e));
theatre.addEventListener("pointermove", (e) => pointerMove(e));
theatre.addEventListener("contextmenu", (e) => e.preventDefault());


// Helper Functions
// Probably things that would be better as parts of classes
window.drawTexture = function(texture, x, y, frame) {
    texture.draw(x, y, frame, ctx); // a "Sprite" seems like it would be better to work with, that contains a frame and x,y
}
window.animateTexture = function() {} // useless for now, as frame is not tracked
window.drawPoint = function(point, size = 4) {
    ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
}
window.drawRectangle = function(rectangle) {
    ctx.fillRect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
}
window.drawCircle = function(circle) { // Should classes take responsibility for their own render methods? or should there be a render class?
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    ctx.fill();
}

globalThis.EASEL = {
    Theatre, Texture, Velocity, Point, Circle, Rectangle, Card, Deck, Terrain, Camera, PhysicsObject, Binds
}

/* Example:

pointerDown = function(e) {
    let {x, y} = theatre.getEventCoordinates(e);

    const cellSize = 50;
    const cell = getCellCoordinate(x, y, cellSize);

    ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
}

function getCellCoordinate(x, y, cellSize) {
    return {
        x: Math.floor(x / cellSize),
        y: Math.floor(y / cellSize)
    }
}

*/