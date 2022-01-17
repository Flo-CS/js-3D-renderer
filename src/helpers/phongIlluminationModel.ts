import AmbientLight from "../lights/AmbientLight";
import Light from "../lights/Light";
import Color from "../materials/Color";
import Material from "../materials/Material";
import Camera from "../things/Camera";
import Vector from "../vectors/Vector";
import { Intersection } from "./types";

// TODO: Replace parameters by more specific parameters (eg: not thing but thing.material ...)
export function calculateAmbientTerm(ambientLight: AmbientLight, material: Material): Color {
    return material.ambientLightReflection
        .mix(ambientLight.ambientLightIntensity);
}

export function calculateDiffuseTermForLight(light: Light, material: Material, lightSurfaceNormalDirection: number): Color {
    return material.diffuseLightReflection
        .mix(light.diffuseIntensity)
        .mix(lightSurfaceNormalDirection)
}

export function calculateSpecularTermForLight(light: Light, material: Material, viewVector: Vector, reflectanceVector: Vector): Color {
    const quantityReflectedToCamera = viewVector.dot(reflectanceVector)
    return material.specularLightReflection
        .mix(light.specularIntensity)
        .mix(quantityReflectedToCamera ** material.shininess)
}

export function getPhongColorAtIntersection({ thing, point, surfaceNormal }: Intersection, ambientLight: AmbientLight, lights: Light[], camera: Camera): Color {

    let finalColor = new Color(0, 0, 0);

    const viewVector = point.minus(camera.position).normalize()

    for (const light of lights) {
        const lightVector = light.position.minus(point).normalize();
        const lightSurfaceNormalDirection = surfaceNormal.dot(lightVector)

        // Ignore the light because the the light is facing the inside of the sphere
        if (lightSurfaceNormalDirection < 0) {
            continue;
        }

        const reflectanceVector = surfaceNormal.scale(2).scale(lightSurfaceNormalDirection).minus(lightVector);

        finalColor = finalColor.add(calculateDiffuseTermForLight(light, thing.material, lightSurfaceNormalDirection))
        finalColor = finalColor.add(calculateSpecularTermForLight(light, thing.material, viewVector, reflectanceVector))

    }

    finalColor = finalColor
        .add(calculateAmbientTerm(ambientLight, thing.material));

    finalColor.clamp()

    return finalColor;
}