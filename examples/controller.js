/*
    This is a simple program to showcase the Keyboard module.
*/

import Theatre from '../src/Theatre.js';
import Velocity from '../src/Velocity.js';
import { Rectangle } from '../src/Shape.js'

import Keyboard from '../src/Keyboard.js';

// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 800, 800);
const ctx = theatre.ctx;
theatre.origin = "CENTER";
theatre.makeFullScreen();
theatre.shorterDimensionConsistent = true;
theatre.redraw = renderObjects;

// State
let tick = 0;
const objects = [{
    x: 0,
    y: 0,
    r: 10,
    v: new Velocity(0,0)
}];
const goal = new Rectangle();
randomizeGoal(goal);

function randomizeGoal(goal) {
    const width = theatre.canvas.width;
    const height = theatre.canvas.height;
    goal.x = Math.floor(Math.random() * width - (width / 2));
    goal.y = Math.floor(Math.random() * height - (height / 2));

    goal.w = Math.floor(Math.random() * 200);
    goal.h = Math.floor(Math.random() * 200);
}

function renderObjects() {
    
    // clear canvas
    ctx.fillStyle = 'rgb(255, 255, 255, 0.8)'; // transparent color for trailing effect
    ctx.fillRect(-theatre.canvas.width/2, -theatre.canvas.height/2, theatre.canvas.width, theatre.canvas.height);

    // draw circles
    ctx.fillStyle = color;
    for (let object of objects) {
        ctx.beginPath();

        let crouchOffset = 0;
        if (crouching && object === objects[0]) {
            crouchOffset = 5;
        }

        ctx.arc(object.x, object.y+crouchOffset, object.r, 0, Math.PI * 2); 
        ctx.fill();
    }

    if (tickChargeStarted) {
        ctx.beginPath();
        ctx.arc(objects[0].x, objects[0].y, tick - tickChargeStarted - 10, 0, Math.PI * 2);
        ctx.stroke();
    }
    
}

function physics() {

    tick++;
    if (tickChargeStarted && tick - tickChargeStarted > 100) {
        tickChargeStarted = tick - 100;
    }

    for (let object of objects) {

        object.v.moveObject(object);
        object.v.applyFriction(0.9999);
        object.v.addVelocity(gravity);
        
        if (object.y + object.r > theatre.canvas.height / 2) {
            object.v.y = -Math.abs(object.v.y);
        }
    }
}

function moveCharacter(character) {
    
    if (moveLeft && character.v.x > -2) {
        character.v.x -= 0.5;
    }
    else if (moveRight && character.v.x < 2) {
        character.v.x += 0.5;
    }

    // stay on ground
    if (character.y + character.r > theatre.canvas.height / 2) {
        character.v.y = 0;
        character.y = (theatre.canvas.height / 2) - character.r;
    }

    const onFloor = objects[0].y == (theatre.canvas.height / 2) - objects[0].r;
    if (onFloor) {
        character.v.applyFriction(0.9);
    }
}

// Key Binds
let standardGravity = new Velocity(0, 0.15);
let lowGravity = new Velocity (0, 0.05);

let moveLeft = false;
let moveRight = false;
let gravity = standardGravity;
let crouching = false;
let color = 'darkblue';
let ammo = 10;
let tickChargeStarted = null;

const keyboard = new Keyboard();

keyboard.bindValue('ArrowLeft', v => moveLeft = v);
keyboard.bindValue('ArrowRight', v => moveRight = v);
keyboard.bindValue('ArrowUp', v => gravity = v, lowGravity, standardGravity);

keyboard.bindToggle('Control', v => crouching = v);
keyboard.bindToggle('x', v => color = v, ['crimson', 'forestgreen', 'darkblue']);

keyboard.bindLogic('r', window.location.reload);

keyboard.bindLogic(' ', () => {
    const onFloor = objects[0].y == (theatre.canvas.height / 2) - objects[0].r;
	if (onFloor) {
		objects[0].v.y -= 4;
	}
});

keyboard.bindLogic('z',
    () => {
        tickChargeStarted = tick - 20;
    },
    () => {
        const character = objects[0];
        const multiplier = (tick - tickChargeStarted) * 0.1;

        objects.push({
            x: character.x,
            y: character.y,
            r: 5,
            v: new Velocity(character.v.x * multiplier, character.v.y * multiplier)
        });

        tickChargeStarted = null;
    }
);

setInterval(() => {
    physics();
    moveCharacter(objects[0]);
    renderObjects();
    ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
    theatre.ctx.fillText(`Controls:`, 0, 0);
    theatre.ctx.fillText(`Jump - Spacebar`, 0, 10);
    theatre.ctx.fillText(`Move - Left Arrow | Right Arrow`, 0, 20);
    theatre.ctx.fillText(`Low Gravity - Up Arrow`, 0, 30);
    theatre.ctx.fillText(`Charge - Z (Hold Down)`, 0, 40);
    theatre.ctx.fillText(`Cycle Color - X`, 0, 50);
}, 20);

// expose as global variables for console testing
globalThis.THEATRE = theatre;
globalThis.OBJECTS = objects;
globalThis.KEYBOARD = keyboard;