import Color from "../materials/Color";

export default class Material {
    ambientLightReflection: Color;
    diffuseLightReflection: Color;
    specularLightReflection: Color;
    shininess: number;

    constructor(ambientLightReflection: Color, diffuseLightReflection: Color, specularLightReflection: Color, shininess: number) {
        this.ambientLightReflection = ambientLightReflection;
        this.diffuseLightReflection = diffuseLightReflection;
        this.specularLightReflection = specularLightReflection;
        this.shininess = shininess;
    }

}