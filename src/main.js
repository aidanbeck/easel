import Dauber from './modules/dauber.js';
import { Entity, Sprite, Circle, Runes, Lattice } from './modules/entities.js';
import { velocity, friction } from './modules/momentum.js';
import getCollisions from './modules/collider.js';
import Bind from './modules/input.js';
import { Position3D, Angle3D, Camera } from './modules/3d.js';

import './style.css';

//Set up render context
document.querySelector('#app').innerHTML = `<canvas></canvas>`; //create canvas
let canvas = document.getElementsByTagName("canvas")[0];
let daub = new Dauber(canvas);

//Define image
const playerImage = new Image();
playerImage.src = "src/assets/dev.bmp";

let objects = [
    new Sprite(playerImage, 20, 20),
    new Circle(10, "white", 30, 30),
    new Runes("T", "green", 50, 50),
]

// Create Lattice
let lattice = new Lattice(3,3,0,0);
lattice.setCell(0,0, {image: playerImage});
lattice.setCell(1,1, {image: playerImage});
lattice.setCell(2,2, {image: playerImage});
objects.push(lattice);

let renderQueue = [0, 1, 2, 3];

function getRenderIndex(mainIndex) {
    for (let i = 0; i < renderQueue.length; i++) {
        if (mainIndex == renderQueue[i]) {
            return i;
        }
    }
}

setInterval(function() {
            
    daub.clear();
    setCollisionColors(objects);

    for (let object of objects) {
        velocity(object);
        friction(object);
    }

    daub.frame(objects, renderQueue);

}, 20);

//Movement
function move(index, x, y) {
    objects[index].v.x += x*2;
    objects[index].v.y += y*2;

    let renderIndex = getRenderIndex(index);
}


//Control next object in array
let controlIndex = 0;
function tabThroughObjects() {
    event.preventDefault(); //prevent default tab behavior
    controlIndex++;
    if (controlIndex >= objects.length) { controlIndex = 0; }
}

//Declare Binds
new Bind("ArrowUp",   () => move(controlIndex,  0, -1 ) );
new Bind("ArrowDown", () => move(controlIndex,  0,  1 ) );
new Bind("ArrowLeft", () => move(controlIndex, -1,  0 ) );
new Bind("ArrowRight",() => move(controlIndex,  1,  0 ) );
new Bind("PageUp",    () => objects[controlIndex].radius += 1 );
new Bind("PageDown",  () =>{objects[controlIndex].radius -= 1; if (objects[controlIndex].radius < 1) { objects[controlIndex].radius = 1; }} );
new Bind("Tab",             tabThroughObjects );

//Color overlapping objects, and color controllable object.
function setCollisionColors(objects) {
    let collisions = getCollisions(objects);
    for (let i = 0; i < objects.length; i++) {
        objects[i].color = "black"
    }
    for (let i = 0; i < collisions.length; i++) {
        objects[collisions[i][0]].color = "steelblue";
        objects[collisions[i][1]].color = "steelblue";
    }
    if (objects[controlIndex].color == "steelblue") {
        objects[controlIndex].color = "lightsteelblue";
    } else {
        objects[controlIndex].color = "white";
    }
}