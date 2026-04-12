// this handles overlaps specifically

class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    overlaps(otherShape) {}

    pointsOverlap(pointA, pointB) {
        return pointA.x == pointB.x && pointA.y == pointB.y;
    }

    circlesOverlap(circleA, circleB) {
        const distance = this.distance(circleA, circleB);
        return distance <= circleA.r + circleB.r;
    }

    pointCircleOverlap(point, circle) {
        const distance = this.distance(point, circle);
        return distance <= circle.r;
    }

    rectanglesOverlap(rectangleA, rectangleB) {
        
        // this could be done beforehand? could it be unneeded>?
        let leftRectangle;
        let rightRectangle;
        let topRectangle;
        let bottomRectangle;

        if (rectangleA.x < rectangleB.x) {
            leftRectangle = rectangleA;
            rightRectangle = rectangleB;
        }

        if (rectangleA.y < rectangleB.y) {
            topRectangle = rectangleA;
            bottomRectangle = rectangleB;
        }

        const horizontalOverlap = leftRectangle.x + leftRectangle.w >= rightRectangle.x;
        const verticalOverlap = topRectangle.y + topRectangle.h >= bottomRectangle.y;

        return horizontalOverlap && verticalOverlap;
    }

    pointRectangleOverlap(point, rectangle) {

        const horizontalOverlap = point.x >= rectangle.x && point.x <= rectangle.x + rectangle.w;
        const verticalOverlap = point.y >= rectangle.y && point.y <= rectangle.y + rectangle.h;

        return horizontalOverlap && verticalOverlap;
    }

    circleRectangleOverlap(circle, rectangle) {
        // TODO
    }

    distance(pointA, pointB) {
        const distanceX = pointA.x - pointB.x;
        const distanceY = pointA.y - pointB.y;
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    }
}

class Point extends Shape {
    constructor(x, y) {
        super(x, y);
    }
    overlaps(otherShape) {
        if (otherShape instanceof Point) { return this.pointCircleOverlap(this, otherShape); }
        if (otherShape instanceof Circle) { return this.pointCircleOverlap(this, otherShape); }
        if (otherShape instanceof Rectangle) { return this.pointRectangleOverlap(this, otherShape); }
    }
}

class Circle extends Shape {
    constructor(x, y, r) {
        super(x, y);
        this.r = r;
    }
    overlaps(otherShape) {

        if (otherShape instanceof Point) { return this.pointCircleOverlap(otherShape, this); }
        if (otherShape instanceof Circle) { return this.circlesOverlap(this, otherShape); }
        if (otherShape instanceof Rectangle) { return this.circleRectangleOverlap(this, otherShape); }
    }
}

class Rectangle extends Shape {
    constructor(x, y, w, h) {
        super(x, y);
        this.w = w;
        this.h = h;
    }
    overlaps(otherShape) {
        if (otherShape instanceof Point) { return this.pointRectangleOverlap(otherShape, this); }
        if (otherShape instanceof Circle) { return this.circleRectangleOverlap(otherShape, this); }
        if (otherShape instanceof Rectangle) { return this.circleRectangleOverlap(otherShape, this); }
    }
}

export { Point, Circle, Rectangle };