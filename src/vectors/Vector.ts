export default class Vector {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(vector: Vector): Vector {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    scale(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar, this.z * scalar)
    }

    divide(scalar: number): Vector {
        return new Vector(this.x / scalar, this.y / scalar, this.z / scalar)
    }

    minus(vector: Vector): Vector {
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    dot(vector: Vector): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z
    }

    normalize(): Vector {
        return this.divide(this.norm)
    }

    get norm(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
    }

    static lerp(start: Vector, end: Vector, t: number) {
        return start.scale(1 - t).add(end.scale(t));
    }

}