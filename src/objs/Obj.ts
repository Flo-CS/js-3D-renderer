import Material from "../materials/Material";
import Ray from "../vectors/Ray";
import Vector from "../vectors/Vector";

export default abstract class Obj {
    material: Material;

    constructor(material: Material) {
        this.material = material;
    }

    abstract computeIntersection(ray: Ray): null | number

    abstract computeSurfaceNormal(point: Vector): Vector

}