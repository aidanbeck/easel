class BindableFunction {
    constructor(downLogic, upLogic) {
        this.downLogic = downLogic;
        this.upLogic = upLogic;
    }

    onDown(values) { this.downLogic(); } // does not pass values
    onUp(values) { this.upLogic(); } // does not pass values
}

class BindableVariable {
    constructor(variableName, downValue, upValue) {
        this.variableName = variableName;
        this.downValue = downValue;
        this.upValue = upValue;
    }

    onDown(values) { values[this.variableName] = this.downValue; }
    onUp(values) { values[this.variableName] = this.upValue; }
}

class BindableToggle {
    constructor(variableName, toggleOnDown, toggleOnUp) {
        this.variableName = variableName;
        this.toggleOnDown = toggleOnDown;
        this.toggleOnUp = toggleOnUp;
    }

    onDown(values) {
        if (!this.toggleOnDown) { return; }
        values[this.variableName] = !values[this.variableName];
    }

    onUp(values) {
        if (!this.toggleOnUp) { return; }
        values[this.variableName] = !values[this.variableName];
    }
}

export default class Binds {
    constructor(element = document) {
        this.values = {};
        this.binds = {};
        element.addEventListener('keydown', this.keyDown.bind(this));
        element.addEventListener('keyup', this.keyUp.bind(this));
    }

    bindLogic(key, downLogic = null, upLogic = null) {
        const bind = new BindableFunction(downLogic, upLogic);
        if (typeof this.binds[key] == 'undefined') { this.binds[key] = []; }
        this.binds[key].push(bind);
    }

    bindValue(key, variableName, upValue = true, downValue = false) {
        const bind = new BindableVariable(downValue, upValue);
        if (typeof this.binds[key] == 'undefined') { this.binds[key] = []; }
        this.binds[key].push(bind);
    }

    bindToggle(key, variableName, toggleOnDown = true, toggleOnUp = false) {
        const bind = new BindableToggle(variableName, toggleOnDown, toggleOnUp);
        if (typeof this.binds[key] == 'undefined') { this.binds[key] = []; }
        this.binds[key].push(bind);
    }
    
    keyDown(event) {
        const key = event.key;
        const binds = this.binds[key];
        if (!binds) { return; }
        for (const bind of binds) {
            bind.downLogic && bind.onDown(this.values);
        }
    }

    keyUp(event) {
        const key = event.key;
        const binds = this.binds[key];
        if (!binds) { return; }
        for (const bind of binds) {
            bind.upLogic && bind.onUp(this.values);
        }
    }
}
