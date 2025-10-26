import Dauber from './modules/dauber.js';
import { Entity, Sprite, Circle, Runes, Lattice } from './modules/entities.js';
import getCollisions from './modules/collider.js';
import { Position3D, Angle3D, Camera } from './modules/3d.js';
import Scene from './modules/scene.js';
import Bind from './modules/input.js';

import './style.css';

// CANVAS & DAUBER
document.querySelector('#app').innerHTML = `<canvas></canvas>`; //create canvas
let canvas = document.getElementsByTagName("canvas")[0];
let daub = new Dauber(canvas);


// SCENE & OBJECTS
let scene = new Scene();
scene.add( new Circle(10, "white", 30, 30) );
scene.add( new Runes("T", "green", 50, 50) );

// Create Image
const playerImage = new Image();
playerImage.src = "src/assets/dev.bmp";
scene.add( new Sprite(playerImage, 20, 20) );

// Create Lattice
let lattice = new Lattice(3,3,0,0);
lattice.setCell(0,0, {image: playerImage});
lattice.setCell(1,1, {image: playerImage});
lattice.setCell(2,2, {image: playerImage});
scene.add(lattice);


// MAIN LOOP
setInterval(function() {
            
    daub.clear();

    scene.applyPhysics();

    daub.frame(scene.objects, scene.renderQueue);

}, 20);


// INTERACTION
let controlIndex = 0;
let controllableObject = scene.objects[controlIndex];

function switchControllableObject() {
    event.preventDefault(); //prevent default tab behavior
    controlIndex++;
    if (controlIndex >= scene.objects.length) { controlIndex = 0; }
    controllableObject = scene.objects[controlIndex];
}

function moveControllableObject(x, y) {
    controllableObject.v.x += x*2;
    controllableObject.v.y += y*2;
}

//Declare Binds
new Bind("ArrowUp",   () => moveControllableObject( 0, -1 ) );
new Bind("ArrowDown", () => moveControllableObject( 0,  1 ) );
new Bind("ArrowLeft", () => moveControllableObject(-1,  0 ) );
new Bind("ArrowRight",() => moveControllableObject( 1,  0 ) );
new Bind("PageUp",    () => controllableObject.radius += 1 );
new Bind("PageDown",  () =>{controllableObject.radius -= 1; if (controllableObject.radius < 1) { controllableObject.radius = 1; }} );
new Bind("Tab",             switchControllableObject );