import Thing from "../things/Thing"

export type Canvas = {
    element: HTMLElement,
    context: CanvasRenderingContext2D,
    imageData: ImageData,
    pixels: Uint8ClampedArray
}

export type Intersection = {
    thing: Thing,
    t: number
} | null