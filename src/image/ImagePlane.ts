import Vector from "./../Vector";

export default class ImagePlane {
    leftTop: Vector;
    rightTop: Vector;
    leftBottom: Vector;
    rightBottom: Vector;

    constructor(
        left: number,
        right: number,
        top: number,
        bottom: number,
        depth: number
    ) {
        this.leftTop = new Vector(left, top, depth);
        this.rightTop = new Vector(right, top, depth);
        this.leftBottom = new Vector(left, bottom, depth);
        this.rightBottom = new Vector(right, bottom, depth);
    }

    performBilinearInterpolation(xt: number, yt: number): Vector {
        const top = Vector.lerp(this.leftTop, this.rightTop, xt);
        const bottom = Vector.lerp(this.leftBottom, this.rightBottom, xt);

        const point = Vector.lerp(bottom, top, yt)

        return point;
    }

}