import Vector from "./vector";

export default class Camera {
    position: Vector;

    constructor(position: Vector) {
        this.position = position;
    }
}