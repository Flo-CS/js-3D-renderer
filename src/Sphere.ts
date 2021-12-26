import Vector from "./Vector";
import Color from "./Color"
import Ray from "./Ray";

export default class Sphere {
    center: Vector;
    radius: number;
    color: Color;

    constructor(center: Vector, radius: number, color: Color) {
        this.center = center;
        this.radius = radius;
        this.color = color;
    }

    intersect(ray: Ray): null | number {
        const c_ = ray.origin.minus(this.center)

        const a = ray.direction.norm ** 2;
        const b = 2 * c_.dot(ray.direction);
        const c = c_.norm ** 2 - this.radius ** 2

        const discriminant = (b ** 2) - (4 * a * c)

        if (discriminant < 0) return null;

        const t1 = (-b + Math.sqrt(discriminant)) / (2 * a)
        const t2 = (-b - Math.sqrt(discriminant)) / (2 * a)

        if (t1 < 0 && t2 > 0) return t2;
        if (t2 < 0 && t1 > 0) return t1;

        return null;

    }
}