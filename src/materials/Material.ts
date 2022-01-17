import Color from "../materials/Color";

export default class Material {
    ambientLightReflection: Color;
    diffuseLightReflection: Color;
    specularLightReflection: Color;
    reflectivity: Color;
    shininess: number;

    constructor(ambientLightReflection: Color, diffuseLightReflection: Color, specularLightReflection: Color, reflectivity: Color, shininess: number) {
        this.ambientLightReflection = ambientLightReflection;
        this.diffuseLightReflection = diffuseLightReflection;
        this.specularLightReflection = specularLightReflection;
        this.reflectivity = reflectivity;
        this.shininess = shininess;
    }

}