/*
    This is a sandbox for testing new Easel modules.
*/

import Theatre from '../src/Theatre.js';
import Texture from '../src/Texture.js';
import { Card, Deck } from '../src/Card.js';

// Theatre Setup
const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 1080, 720);
// theatre.origin = "CENTER";
theatre.makeFullScreen();
theatre.shorterDimensionConsistent = true;
theatre.canvas.style.backgroundColor = "rgb(255, 255, 255)";
theatre.ctx.imageSmoothingEnabled = false; //prevent image blurring
theatre.redraw = renderDeck;

// Interaction
theatre.addEventListener("pointerdown", pointerdown);
theatre.addEventListener("pointermove", pointermove);

function pointermove(event) {

    document.body.style.cursor = ""; //reset cursor
    let {x, y} = theatre.getEventCoordinates(event);
    currentDeck.hover(x, y, theatre.ctx);
}

function pointerdown(event) {
    let {x, y} = theatre.getEventCoordinates(event);
    currentDeck.click(x, y, theatre.ctx);
    renderDeck();
}


// Decks

// Setup Decks
const decks = [];
let currentDeck;
function renderDeck() {
    theatre.canvas.width = theatre.canvas.width; // reset canvas
    currentDeck.render(theatre.ctx);
}

// Bench Deck
const benchTexture = new Texture('./examples/bench.jpg');
const benchScene = new Deck(benchTexture);
decks.push(benchScene);
currentDeck = benchScene;


// Cards

// Head Card
const headCard = new Card(430, 350, 70, 60);
const dialogue = ["", "Ow!", "Hey—", "Ouch!", "Stop that—", ":("];
let dialougeIndex = 0;
headCard.onHover = () => {
    document.body.style.cursor = "pointer";
}
headCard.onClick = () => {
    dialougeIndex++;
    if (dialougeIndex > dialogue.length - 1) {
        dialougeIndex = 1;
    }
}
headCard.onRender = (ctx) => {

    ctx.font = "40px Consolas";
    ctx.fillStyle = "white";
    ctx.shadowColor = "black"
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.fillText(dialogue[dialougeIndex], headCard.x + 80, headCard.y);
}
benchScene.cards.push(headCard);


window.onload = function() {
    renderDeck();
};

globalThis.DECKS = decks; 

// todo
// fullscreen should work with the card centered
// moving between screens should be showcased
// frames changing should be showcased
// visible cards should be showcased
// cursors could be officially supported
// offscreen canvas could be supported
// should onRender context be offset by card? or should it take it's own offset responsibility?
// the "world" could instead be a key of card names. Moving between "decks" could be oficially supported
// default hover/click for the background card, could be used to set default cursor or hover action