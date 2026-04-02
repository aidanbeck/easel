/*
    - Thrust (opposite of friction)
    ~ Conditionals (apply thrust to certain point)
    ~ Animate (arrive at specific point)
*/

function velocity(object) {
    //Clamp low velocities (Should this be here?)
    if (object.v.x < 0.1 && object.v.x > -0.1) { object.v.x = 0; }
    if (object.v.y < 0.1 && object.v.y > -0.1) { object.v.y = 0; }

    object.x += object.v.x;
    object.y += object.v.y;

}

function gravity(object, g = 0.1) {
    object.v.y += g;
}

function friction(object, f = 0.05) {
    if (object.v.x > 0) { object.v.x -= f; }
    if (object.v.x < 0) { object.v.x += f; }
    if (object.v.y > 0) { object.v.y -= f; }
    if (object.v.y < 0) { object.v.y += f; }
}

function thrust(object, t = 0.1) {
    friction(object, -t); //this and friction should probably be combined
}

export { velocity, gravity, friction, thrust };