export default class Velocity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    moveObject(object) {
        object.x += this.x;
        object.y += this.y;
    }

    addVelocity(velocity) {
        this.x += velocity.x;
        this.y += velocity.y;
    }

    invert() {
        this.x = -this.x;
        this.y = -this.y;
    }

    getMagnitude() {
        let hypotenuseLength = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        return hypotenuseLength;
    }

    // - - - - -

    applyGravity(gravity) {
        this.y += gravity; // +y is down
    }
}