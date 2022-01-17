import Color from "../materials/Color";

export default class AmbientLight {
    ambientLightIntensity: Color;

    constructor(ambientLightIntensity: Color) {
        this.ambientLightIntensity = ambientLightIntensity;
    }
}