import Vector from "../vectors/Vector";
import Color from "../materials/Color"
import Ray from "../vectors/Ray";
import Thing from "./Thing"
import Material from "../materials/Material";
import { min } from "../helpers/utilities";

export default class Sphere extends Thing {
    radius: number;

    constructor(center: Vector, radius: number, material: Material) {
        super(center, material)
        this.radius = radius;
    }

    computeIntersection(ray: Ray): null | number {
        const c_ = ray.origin.minus(this.position)

        const a = ray.direction.norm ** 2;
        const b = 2 * c_.dot(ray.direction);
        const c = c_.norm ** 2 - (this.radius ** 2)

        const discriminant = (b ** 2) - (4 * a * c)

        if (discriminant < 0) return null;

        const t1 = (-b + Math.sqrt(discriminant)) / (2 * a)
        const t2 = (-b - Math.sqrt(discriminant)) / (2 * a)

        const solus = [t1, t2].filter(s => s >= 0)

        return min(solus)
    }

    computeSurfaceNormal(point: Vector): Vector {
        return point.minus(this.position).normalize();
    }
}