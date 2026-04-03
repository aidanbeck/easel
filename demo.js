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