import Theatre from './src/Theatre.js';

const canvasElement = document.getElementById("theatre");
const theatre = new Theatre(canvasElement, 800, 800);

theatre.origin = "CENTER";
theatre.makeFullScreen();
theatre.shorterDimensionConsistent = true;
theatre.redraw = redraw;
theatre.canvas.style.backgroundColor = "#f8f9fa";
theatre.ctx.imageSmoothingEnabled = false; //prevent image blurring

theatre.addEventListener("mousemove", onMouseMove);
theatre.addEventListener("click", onClick);

let mouseDown = false;
let newLine = false;
theatre.addEventListener("mousedown", () => {mouseDown = true});
theatre.addEventListener("mouseup", () => {mouseDown = false});

const lines = [];
function onMouseMove(event) {
    let {x, y} = theatre.getEventCoordinates(event);
    const ctx = theatre.ctx;
    
    if (!mouseDown) {
        ctx.moveTo(x, y);
        newLine = true;
        return;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    lines.push({x, y, newLine});
    newLine = false;
}

const points = [];
function onClick(event) {
    let {x, y} = theatre.getEventCoordinates(event);
    const ctx = theatre.ctx;

    //ctx.fillRect(x-3, y-3, 6, 6);
    points.push({x, y});
}

function redraw() {
    const ctx = theatre.ctx;
    
    //this.ctx.fillRect(-3, -3, 6, 6); // origin

    const widthOffset = -theatre.preferredWidth / 2;
    const heightOffset = -theatre.preferredHeight / 2;
    //this.ctx.strokeRect(widthOffset, heightOffset, theatre.preferredWidth, theatre.preferredHeight); // preferred dimensions

    for (let point of points) {
        //ctx.fillRect(point.x - 3, point.y - 3, 6, 6);
    }

    ctx.beginPath;
    for (let line of lines) {
        line.newLine && ctx.moveTo(line.x, line.y);
        !line.newLine && ctx.lineTo(line.x, line.y);
    }

    ctx.stroke();
}

globalThis.THEATRE = theatre; // expose as global variable for console testing

// // SCENE & OBJECTS
// let scene = new Scene();
// scene.add( new Circle(10, "white", 30, 30) );
// scene.add( new Runes("T", "green", 50, 50) );

// // Create Image
// const playerImage = new Image();
// playerImage.src = "src/assets/dev.bmp";
// scene.add( new Sprite(playerImage, 20, 20) );

// // Create Lattice
// let lattice = new Lattice(3,3,0,0);
// lattice.setCell(0,0, {image: playerImage});
// lattice.setCell(1,1, {image: playerImage});
// lattice.setCell(2,2, {image: playerImage});
// scene.add(lattice);


// // MAIN LOOP
// setInterval(function() {
            
//     daub.clear();

//     scene.applyPhysics();

//     daub.frame(scene.objects, scene.renderQueue);

// }, 20);