import Thing from "../things/Thing"
import Vector from "../vectors/Vector"

export type Canvas = {
    element: HTMLElement,
    context: CanvasRenderingContext2D,
    imageData: ImageData,
    pixels: Uint8ClampedArray
}

export type Intersection = {
    thing: Thing,
    t: number,
    surfaceNormal: Vector,
    point: Vector
}