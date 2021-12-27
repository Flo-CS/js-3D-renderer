import Vector from "../vectors/Vector";

export default class Camera {
    position: Vector;

    constructor(position: Vector) {
        this.position = position;
    }
}