import Color from "./Color";
import Image from "./Image";
import ImagePlane from "./ImagePlane";
import Vector from "./Vector";
import Camera from "./Camera";
import Ray from "./Ray";
import Sphere from "./Sphere";
import { scale } from "./utilities"


// SETUP THE IMAGE AND THE PLANE REPRESENTING THE IMAGE
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

// SETUP THE CAMERA
const camera = new Camera(new Vector(0, 0, -1))


// SETUP THE SCENE
// TODO: CREATE A SCENE CLASS
const scene: any[] = []

const sphere1 = new Sphere(new Vector(0.25, 0.5, 0), 0.25, new Color(1, 0, 0))
const sphere2 = new Sphere(new Vector(-0.10, -0.25, 0), 0.15, new Color(0, 1, 0))

scene.push(sphere1)
scene.push(sphere2)

// DETERMINE WHERE TO CAST RAYS AND CREATE CORRESPONDING RAYS
const rays: Ray[][] = [];

for (let y = 0; y < HEIGHT; y++) {
    rays.push([])
    for (let x = 0; x < WIDTH; x++) {
        const { alpha, beta } = image.convertPixelCoordsIntoPercentages(x, y);
        const intersection = imagePlane.performBilinearInterpolation(alpha, beta);

        const ray = new Ray(intersection, intersection.minus(camera.location));
        rays[y].push(ray)
    }
}

// DETERMINE RAYS INTERSECTIONS WITH OBJECTS IN THE SCENE

for (let y = 0; y < rays.length; y++) {
    for (let x = 0; x < rays[y].length; x++) {

        const object = determineClosestObject(scene, rays[y][x])

        if (object != null) {
            image.putPixel(x, y, object.color)
        } else {
            image.putPixel(x, y, new Color())
        }
    }
}


function determineClosestObject(scene: any[], ray: Ray) {
    let closestObject = null;
    let lowestIntersection = Infinity; // Note: this work because intersection can't be inferior to 0

    for (const object of scene) {
        const intersection = object.intersect(ray)
        if (intersection && intersection < lowestIntersection) {
            lowestIntersection = intersection;
            closestObject = object;
        }
    }

    return closestObject
}


// RENDER THE CREATED IMAGE INTO THE HTML DOCUMENT
image.renderInto(document.body);