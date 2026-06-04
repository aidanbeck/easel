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
}