//Movement
function move(index, x, y) {
    scene.objects[index].v.x += x*2;
    scene.objects[index].v.y += y*2;
}

//Control next object in array
let controlIndex = 0;
function tabThroughObjects() {
    event.preventDefault(); //prevent default tab behavior
    controlIndex++;
    if (controlIndex >= scene.objects.length) { controlIndex = 0; }
}

//Declare Binds
new Bind("ArrowUp",   () => move(controlIndex,  0, -1 ) );
new Bind("ArrowDown", () => move(controlIndex,  0,  1 ) );
new Bind("ArrowLeft", () => move(controlIndex, -1,  0 ) );
new Bind("ArrowRight",() => move(controlIndex,  1,  0 ) );
new Bind("PageUp",    () => objects[controlIndex].radius += 1 );
new Bind("PageDown",  () =>{objects[controlIndex].radius -= 1; if (objects[controlIndex].radius < 1) { objects[controlIndex].radius = 1; }} );
new Bind("Tab",             tabThroughObjects );