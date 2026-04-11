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

    clamp(minimum = 0.01, maximum = 1000) {
        if (Math.abs(this.x) < minimum) { this.x = 0; }
        if (Math.abs(Math.abs(this.y)) > minimum) { this.y = 0; }
    }

    // - - - - -

    applyFriction(friction) {
        this.x *= friction;
        this.y *= friction;
    }

    applyGravity(gravity) {
        this.y += gravity; // +y is down
    }
}