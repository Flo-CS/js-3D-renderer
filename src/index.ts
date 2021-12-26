import Color from "./Color";
import Image from "./Image";
import ImagePlane from "./ImagePlane";
import Vector from "./Vector";
import Camera from "./Camera";
import Ray from "./Ray";
import { scale } from "./utilities"

const WIDTH = 256;
const HEIGHT = 192;

// Keep same aspect ratio as the image
const IMAGE_PLANE_LEFT = -1;
const IMAGE_PLANE_RIGHT = 1;
const IMAGE_PLANE_TOP = -0.75;
const IMAGE_PLANE_BOTTOM = 0.75;

const image = new Image(WIDTH, HEIGHT);

const imagePlane = new ImagePlane(
    IMAGE_PLANE_LEFT, IMAGE_PLANE_RIGHT, IMAGE_PLANE_TOP, IMAGE_PLANE_BOTTOM
)

const camera = new Camera(new Vector(0, 0, -1))

const rays: Ray[] = [];

for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
        const { alpha, beta } = image.convertPixelCoordsIntoPercentages(x, y);
        const intersection = imagePlane.performBilinearInterpolation(alpha, beta);

        const ray = new Ray(intersection, intersection.minus(camera.location));
        rays.push(ray)
    }
}

console.log(rays);


for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
        const offset = y * WIDTH + x;
        const color = new Color(
            scale(rays[offset].direction.x, IMAGE_PLANE_LEFT, IMAGE_PLANE_RIGHT, 0, 255),
            scale(rays[offset].direction.y, IMAGE_PLANE_TOP, IMAGE_PLANE_BOTTOM, 255, 0),
            256 / 2
        );

        image.putPixel(x, y, color);

    }
}

image.renderInto(document.body);