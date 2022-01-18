import Obj from "../objs/Obj"
import Vector from "../vectors/Vector"

export type Canvas = {
    element: HTMLElement,
    context: CanvasRenderingContext2D,
    imageData: ImageData,
    pixels: Uint8ClampedArray
}

export type Intersection = {
    obj: Obj,
    t: number,
    surfaceNormal: Vector,
    point: Vector,
    viewVector: Vector,
    reflectanceVector: Vector
}