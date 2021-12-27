import Camera from "../things/Camera";
import Vector from "./Vector";

export default class Ray {
    origin: Vector;
    direction: Vector;

    constructor(origin: Vector, direction: Vector) {
        this.origin = origin;
        this.direction = direction;
    }

    // TODO : Understand this because this is a part of the tutorial solution
    at(t: number) {
        return this.origin.add(this.direction.scale(t));

    }
}