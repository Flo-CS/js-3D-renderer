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

    minus(vector: Vector): Vector {
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);

    }
}