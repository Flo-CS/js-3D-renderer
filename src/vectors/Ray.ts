import Vector from "./Vector";

export default class Ray {
    origin: Vector;
    direction: Vector;

    constructor(origin: Vector, direction: Vector) {
        this.origin = origin;
        this.direction = direction;
    }

    at(t: number) {
        return this.origin.add(this.direction.scale(t));

    }
}