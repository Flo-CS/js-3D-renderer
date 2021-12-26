import Vector from "./Vector";

export default class ImagePlane {
    leftTop: Vector;
    rightTop: Vector;
    leftBottom: Vector;
    rightBottom: Vector;

    constructor(
        left: number,
        right: number,
        top: number,
        bottom: number
    ) {
        this.leftTop = new Vector(left, top, 0);
        this.rightTop = new Vector(right, top, 0);
        this.leftBottom = new Vector(left, bottom, 0);
        this.rightBottom = new Vector(right, bottom, 0);
    }

    performBilinearInterpolation(alpha: number, beta: number): Vector {
        const t = this.leftTop.scale(1 - alpha).add(this.rightTop.scale(alpha)); // (1-alpha)*topLeft + alpha*topRight
        const b = this.leftBottom.scale(1 - alpha).add(this.rightBottom.scale(alpha));// (1-alpha)*bottomLeft + alpha*bottomRight

        const p = t.scale(1 - beta).add(b.scale(beta)); // (1-beta)*t + beta*b

        return p;
    }

}