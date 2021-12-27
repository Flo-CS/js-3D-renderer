import Color from "../materials/Color";
import Material from "../materials/Material";
import Vector from "../vectors/Vector";
import Ray from "../vectors/Ray";

export default class Thing {
    position: Vector;
    material: Material;

    constructor(position: Vector, material: Material) {
        this.position = position;
        this.material = material;
    }

    computeIntersection(ray: Ray): null | number {
        return null;
    }

    computeSurfaceNormal(point: Vector): Vector {
        return new Vector(0, 0, 0);
    }

}