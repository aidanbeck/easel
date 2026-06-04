class Camera {
    constructor(x = 0, y = 0, z = 0, pitch = 0, yaw = 0, fov = 90) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.pitch = pitch; // up and down
        this.yaw = yaw; // left and right
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

        const highestYs = new Int32Array(theatre.canvas.width).fill(theatre.canvas.height);

        let rayDepthOffset = 1;

        for (let rayDepth = 1; rayDepth < 500; rayDepth += rayDepthOffset) {

            // get starting world x & y
            // get offsets for x & y per each ray

            //debug for testing
            let startX = 0;
            let startY = rayDepth;
            let xOffset = 1;
            let yOffset = 1;

            this.drawRay(startX, startY, xOffset, yOffset, theatre, highestYs);

            rayDepthOffset += 0.005;
        }
    }

    drawRay(x, y, xOffset, yOffset, theatre, highestYs) {
        
        const CAMERA = new Camera(10, 20, 10, 180, 0, 90);

        for (let i = 0; i < theatre.canvas.width; i++) {

            const terrainPoint = this.getPoint( Math.floor(x), Math.floor(y));
            const color = "green"; //terrainPoint.color;
            const altitude = terrainPoint.altitude;

            let heightOnScreen = (CAMERA.z - altitude) + CAMERA.pitch; // !!! This is likely missing crucial math

            this.drawPillar(i, heightOnScreen, highestYs[i], color, theatre.ctx);

            if (heightOnScreen > highestYs[i]) { highestYs[i] = heightOnScreen; }

            x += xOffset;
            y += yOffset;

        }

    }

    drawPillar(x, y, height, color, ctx) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}

