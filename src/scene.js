import { velocity, friction } from './momentum.js';

class Scene {
    constructor() {
        this.objects = [];
        this.renderQueue = []; // a queue of object indexes to render
    }

    add(object, addToQueue = true) {
        this.objects.push(object);
        if (addToQueue) {
            this.renderQueue.push(this.objects.length - 1);
        }
    }

    applyPhysics() {
        for (let object of this.objects) {
            velocity(object);
            friction(object);
        }
    }
}

export default Scene;