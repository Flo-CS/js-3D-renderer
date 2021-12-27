import Color from "../materials/Color"
import { Canvas } from "../helpers/types";
import { scale } from "../helpers/utilities";

export default class Image {
  width: number;
  height: number;
  canvas: Canvas;


  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.canvas = this.createCanvas();
  }

  createCanvas() {
    const element = document.createElement('canvas');
    element.width = this.width
    element.height = this.height

    const context = element.getContext('2d')!
    const imageData = context.getImageData(0, 0, this.width, this.height);
    const pixels = imageData.data;

    return {
      element,
      context,
      imageData,
      pixels
    };
  }

  putPixel(x: number, y: number, color: Color) {

    const red = color.red * 255
    const green = color.green * 255
    const blue = color.blue * 255


    const offset = (y * this.width + x) * 4;
    this.canvas.pixels[offset] = red;
    this.canvas.pixels[offset + 1] = green;
    this.canvas.pixels[offset + 2] = blue;
    this.canvas.pixels[offset + 3] = 255;
  }

  renderInto(elem: HTMLElement) {
    this
      .canvas
      .context
      .putImageData(
        this.canvas.imageData,
        0,
        0
      );

    elem.appendChild(this.canvas.element);
  }


}