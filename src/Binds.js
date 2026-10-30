class BoundLogic {
    constructor(downLogic, upLogic) {
        this.downLogic = downLogic;
        this.upLogic = upLogic;
        this.isDown = false;
    }
    
    onDown() {
        this.downLogic && this.downLogic();
        this.isDown = true;
    }
    
    onUp() {
        this.upLogic && this.upLogic();
        this.isDown = false;
    }
}

class BoundValue {
    constructor(setter, downValue, upValue) {
        this.setter = setter;
        this.downValue = downValue;
        this.upValue = upValue;
        this.isDown = false;
    }
    
    onDown() {
        this.setter(this.downValue);
        this.isDown = true;
    }
    
    onUp() {
        this.setter(this.upValue);
        this.isDown = false;
    }
}

export default class Binds {
    constructor(element = document) {
        this.binds = {};
        element.addEventListener('keydown', this.keyDown.bind(this));
        element.addEventListener('keyup', this.keyUp.bind(this));
    }

    bindLogic(key, downLogic = null, upLogic = null) {
        if (typeof this.binds[key] == 'undefined') { this.binds[key] = []; } // create array to hold bind if none exists
        
        const bind = new BoundLogic(downLogic, upLogic);
        this.binds[key].push(bind);
    }

    bindValue(key, setter, upValue = true, downValue = false) {
        if (typeof this.binds[key] == 'undefined') { this.binds[key] = []; }  // create array to hold bind if none exists

        const bind = new BoundValue(setter, downValue, upValue);
        this.binds[key].push(bind);
    }
    
    keyDown(event) {
        const key = event.key;
        const binds = this.binds[key];
        if (!binds) { return; }
        
        for (const bind of binds) {
            !bind.isDown && bind.onDown();
        }
    }

    keyUp(event) {
        const key = event.key;
        const binds = this.binds[key];
        if (!binds) { return; }
        
        for (const bind of binds) {
           bind.isDown && bind.onUp();
        }
    }
}
