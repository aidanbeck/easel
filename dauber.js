class Dauber {
    constructor(canvas, font = "20px Courier New") {
        this.ctx = canvas.getContext("2d");
        this.ctx.font = font;

    }

    circle(radius, color, x, y) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    image(image, x, y) {
        this.ctx.drawImage(image, x, y);
    }

    text(string, color, x, y) {
        this.ctx.fillStyle = color;
        this.ctx.fillText(string, x, y);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    frame(array, indexes) {
        for (let i = 0; i < indexes.length; i++) {
            let object = array[indexes[i]];
            object.render(this);
        }
    }

}

export default Dauber;