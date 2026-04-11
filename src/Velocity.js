export default class Velocity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    moveObject(object) {
        object.x += this.x;
        object.y += this.y;
    }
}