/*
    This is a simple program to showcase the Texture module.
    Click to add an animated character from Labyrinth, a game I made in high school.
*/

import Theatre from '../src/Theatre.js';
import Texture from '../src/Texture.js';

// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 100, 100);
const ctx = theatre.ctx;
theatre.origin = "CENTER";
theatre.makeFullScreen();
theatre.shorterDimensionConsistent = true;
theatre.canvas.style.imageRendering = "pixelated"; // prevents pixel blurring
theatre.redraw = redrawSprites;

// Interaction
theatre.addEventListener("click", addSprite);

// State
const guyTexture = new Texture('./examples/lab.bmp', 9, -4, -14);
const sprites = [];

function addSprite(event) {
    let {x, y} = theatre.getEventCoordinates(event);

    x = Math.floor(x);
    y = Math.floor(y);

    sprites.push({
        x: x,
        y: y,
        texture: guyTexture,
        frame: 0
    })
    
}

function redrawSprites() {

    for (let sprite of sprites) {
        sprite.texture.draw(sprite.x, sprite.y, sprite.frame, ctx)
        // sprite.texture.fillDraw(sprite.x, sprite.y, 20, 20, sprite.frame, ctx);
    }

}

function animateSprites() {
    for (let sprite of sprites) {
        sprite.frame++;
        if (sprite.frame > sprite.texture.frameCount) {
            sprite.frame = 0;
        }
    }

    redrawSprites();
}

setInterval(animateSprites, 100);

globalThis.THEATRE = theatre; // expose as global variable for console testing
globalThis.SPRITES = sprites;