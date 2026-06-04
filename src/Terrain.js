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

class Terrain {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.altitudeMap = new Uint8Array(width * height);
        this.colorMap = [];
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

    drawRays(camera = CAMERA, theatre) {

        const highestYs = new Int32Array(theatre.canvas.width).fill(theatre.canvas.height);

        let rayDepthOffset = 1;

        for (let rayDepth = 1; rayDepth < 500; rayDepth += rayDepthOffset) {

            const leftPoint = {
                x: camera.x - rayDepth,
                y: camera.y + 10 + rayDepth
            }

            const rightPoint = {
                x: camera.x + rayDepth,
                y: camera.y + 10 + rayDepth
            }

            const rayWidth = rightPoint.x - leftPoint.x;

            let xOffset = rayWidth / theatre.canvas.width;
            let yOffset = 0; // assumes straight line

            this.drawRay(leftPoint.x, leftPoint.y, xOffset, yOffset, theatre, highestYs, camera);

            rayDepthOffset += 0.005;
        }
    }

    drawRay(x, y, xOffset, yOffset, theatre, highestYs, camera) {
        
        for (let i = 0; i < theatre.canvas.width; i++) {

            const terrainPoint = this.getPoint( Math.floor(x), Math.floor(y));
            const color = terrainPoint.color;
            const altitude = terrainPoint.altitude;

            let heightOnScreen = (camera.z - altitude) + camera.pitch; // !!! Could be missing scaling variable and being affected by raydepth

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

export { Terrain, Camera };