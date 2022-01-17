import Material from "../materials/Material";
import Ray from "../vectors/Ray";
import Vector from "../vectors/Vector";

export default abstract class Obj {
    position: Vector;
    material: Material;

    constructor(position: Vector, material: Material) {
        this.position = position;
        this.material = material;
    }

    abstract computeIntersection(ray: Ray): null | number

    abstract computeSurfaceNormal(point: Vector): Vector

}