import Camera from "./Camera";
import Vector from "./vector";

export default class Ray {
    origin: Vector;
    direction: Vector;

    constructor(origin: Vector, direction: Vector) {
        this.origin = origin;
        this.direction = direction;
    }
}