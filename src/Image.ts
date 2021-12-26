import Color from "./Color"

type Canvas = {
  element: HTMLElement,
  context: CanvasRenderingContext2D,
  imageData: ImageData,
  pixels: Uint8ClampedArray
}

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
    const offset = (y * this.width + x) * 4;
    this.canvas.pixels[offset] = color.red;
    this.canvas.pixels[offset + 1] = color.green;
    this.canvas.pixels[offset + 2] = color.blue;
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

  convertPixelCoordsIntoPercentages(x: number, y: number): { alpha: number, beta: number } {
    return {
      alpha: x / (this.width - 1),
      beta: y / (this.height - 1),
    }
  }

}