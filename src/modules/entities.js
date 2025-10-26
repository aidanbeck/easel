class Entity {
    constructor(x, y, v = {x:0, y:0}) {
        this.x = x;
        this.y = y;
        this.v = v;
    }
}

class Sprite extends Entity {
    constructor(image, x, y, v) {
        super(x, y, v);
        this.image = image;
    }

    render(dauber) {
        dauber.image(this.image, this.x, this.y);
    }
}

class Circle extends Entity {
    constructor(radius, color, x, y, v) {
        super(x, y, v);
        this.radius = radius;
        this.color = color;
    }

    render(dauber) {
        dauber.circle(this.radius, this.color, this.x, this.y);
    }
}

class Runes extends Entity {
    constructor(string, color, x, y, v) {
        super(x, y, v);
        this.string = string;
        this.color = color;
    }

    render(dauber) {
        dauber.text(this.string, this.color, this.x, this.y);
    }
}

class Lattice extends Entity {

    constructor(width, height, x, y, cellWidth = 32, cellHeight = 32, v) {
        super(x, y, v);
        this.width = width;
        this.height = height;
        this.scale = { width: cellWidth, height: cellHeight };
        this.cells = new Array(height);

        for (let i = 0; i < height; i++) {
            this.cells[i] = new Array(width);
            this.cells[i].fill(null);
        }
    }

    setCell(x, y, object) {
        this.cells[y][x] = object;
    }

    render(dauber) {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.cells[i][j]) {
                    dauber.image(
                        this.cells[i][j].image,
                        this.x + this.scale.width * j,
                        this.y + this.scale.height * i
                    )
                }
            }
        }
    }
}

export { Entity, Sprite, Circle, Runes, Lattice }