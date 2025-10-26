import Dauber from './modules/dauber.js';
import { Entity, Sprite, Circle, Runes, Lattice } from './modules/entities.js';
import getCollisions from './modules/collider.js';
import Bind from './modules/input.js';
import { Position3D, Angle3D, Camera } from './modules/3d.js';
import Scene from './modules/scene.js';

import './style.css';

//Set up render context
document.querySelector('#app').innerHTML = `<canvas></canvas>`; //create canvas
let canvas = document.getElementsByTagName("canvas")[0];
let daub = new Dauber(canvas);

//Define image
const playerImage = new Image();
playerImage.src = "src/assets/dev.bmp";

let scene = new Scene();
scene.add( new Sprite(playerImage, 20, 20) );
scene.add( new Circle(10, "white", 30, 30) );
scene.add( new Runes("T", "green", 50, 50) );

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