class Camera {
    constructor(x = 0, y = 0, z = 0, pitch = 0, yaw = 0, fov = 90) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.pitch = pitch; // up and down
        this.yaw = yaw; //up and down
        this.fov = fov;
    }
}

export default class Terrain {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.altitudeMap = new Uint8Array(width * height);
        this.colorMap = new Uint32Array(width * height);
    }

    getPointIndex(x, y) {
        return y * this.width + x;
    }

    getPoint(x, y) {
        const index = this.getPointIndex(x, y);
        return {
            altitude: this.altitudeMap[index],
            color: this.colorMap[index]
        }
    }

    setPoint(x, y, altitude, color) {
        const index = this.getPointIndex(x, y);

        if (altitude) { this.altitudeMap[index] = altitude; }
        if (color) { this.colorMap[index] = color; }
    }

    drawRays(camera, theatre) {

        const highestYs = new Int32Array(theatre.canvas.width).fill(theatre.canvas.height / 2); // assumes origin is in the middle

        let rayDepthOffset = 1;

        for (let rayDepth = 1; rayDepth < 500; rayDepth += rayDepthOffset) {

            // get starting world x & y
            // get offsets for x & y per each ray

            //debug for testing
            let y = 0;
            let x = rayDepth;
            let xOffset = 4;
            let yOffset = 4;

            this.drawRay(x, y, xOffset, yOffset, theatre.ctx);

            rayDepthOffset += 0.005;
        }



    }

    drawRay(x, y, xOffset, yOffset, ctx) {

        //for testing
        this.drawPillar(x, y, 100, "red", ctx);
    }

    drawPillar(x, y, height, color, ctx) { // may move this method
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}

