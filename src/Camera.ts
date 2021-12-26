import Vector from "./vector";

export default class Camera {
    location: Vector;

    constructor(location: Vector) {
        this.location = location;
    }
}