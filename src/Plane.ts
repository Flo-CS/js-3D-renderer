import Vector from "./vector";

export default class Plane {
    topLeft: Vector;
    topRight: Vector;
    bottomLeft: Vector;
    bottomRight: Vector;

    constructor(
        topLeft: Vector,
        topRight: Vector,
        bottomLeft: Vector,
        bottomRight: Vector
    ) {
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }

}