import Color from "../materials/Color";
import Vector from "../Vector";

export default class Light {
    position: Vector;
    diffuseIntensity: Color;
    specularIntensity: Color;

    constructor(position: Vector, diffuseIntensity: Color, specularIntensity: Color) {
        this.position = position;
        this.diffuseIntensity = diffuseIntensity;
        this.specularIntensity = specularIntensity;
    }
}