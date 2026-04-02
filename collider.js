//returns pairs of indexes corresponding to colliding objects
function getCollisions(objects) {
    let collisions = [];
    for (let i = 0; i < objects.length; i++) {
        for (let j = i + 1; j < objects.length; j++) {
            let isColliding = circleCollision(objects[i], objects[j]);
            if (isColliding) {
                collisions[collisions.length] = [i, j];
            }
        }
    }
    return collisions;
}

function circleCollision(object1, object2) {

    let distance = getDistance(object1.x, object1.y, object2.x, object2.y);
    if (distance < object1.radius + object2.radius) { return true; }
    return false;
}

function getDistance(x1, y1, x2, y2) {

    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

export default getCollisions;