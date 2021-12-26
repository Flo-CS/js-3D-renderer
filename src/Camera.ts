import Vector from "./vector";

export default class Camera {
    location: Vector;

    constructor(direction: Vector) {
        this.location = direction;
    }
}