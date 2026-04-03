class Position3D {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Angle3D {
    constructor(pitch = 0, yaw = 0, roll = 0) {
        this.pitch = pitch;
        this.yaw = yaw;
        this.roll = roll;
    }
}

class Camera {
    constructor(position = new Position3D(), angle = new Angle3D()) {
        this.position = position;
        this.angle = angle;
    }
}

export { Position3D, Angle3D, Camera };