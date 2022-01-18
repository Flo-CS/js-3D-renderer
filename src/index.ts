import Image from "./image/Image";
import ImagePlane from "./image/ImagePlane";
import Light from "./lights/Light";
import Color from "./materials/Color";
import Material from "./materials/Material";
import Scene from "./Scene";
import Camera from "./objs/Camera";
import Sphere from "./objs/Sphere";
import Vector from "./vectors/Vector";


// SETUP THE IMAGE AND THE PLANE REPRESENTING THE IMAGE
const WIDTH = 480;
const HEIGHT = 360;

// Keep same aspect ratio as the image
const IMAGE_PLANE_LEFT = -1.28;
const IMAGE_PLANE_RIGHT = 1.28;
const IMAGE_PLANE_TOP = 0.86;
const IMAGE_PLANE_BOTTOM = -0.86;
const IMAGE_PLANE_DEPTH = -0.5;

const image = new Image(WIDTH, HEIGHT);

const imagePlane = new ImagePlane(
    IMAGE_PLANE_LEFT, IMAGE_PLANE_RIGHT, IMAGE_PLANE_TOP, IMAGE_PLANE_BOTTOM, IMAGE_PLANE_DEPTH
)

// SETUP THE CAMERA
const camera = new Camera(new Vector(0, 0, 2))


// SETUP THE SCENE
const scene = new Scene(document.body, image, imagePlane, camera)

const greenMaterial = new Material(
    new Color(0.1, 0.1, 0.1),
    new Color(0.5, 0.9, 0.5),
    new Color(0.7, 0.7, 0.7),
    new Color(0.9, 0.9, 0.8),
    20,
)

const blueMaterial = new Material(
    new Color(0.1, 0.1, 0.1),
    new Color(0.5, 0.5, 0.9),
    new Color(0.7, 0.7, 0.7),
    new Color(0.1, 0.1, 0.2),
    20,
)

const redMaterial = new Material(
    new Color(0.1, 0.1, 0.1),
    new Color(0.9, 0.5, 0.5),
    new Color(0.7, 0.7, 0.7),
    new Color(0.2, 0.1, 0.1),
    20,
)


const sphere1 = new Sphere(new Vector(-1.1, 0.6, -1), 0.2, blueMaterial)
const sphere2 = new Sphere(new Vector(0.2, -0.1, -1), 0.5, redMaterial)
const sphere3 = new Sphere(new Vector(1.2, -0.5, -1.75), 0.4, greenMaterial)

scene.addObj(sphere1)
scene.addObj(sphere2)
scene.addObj(sphere3)

const light1 = new Light(new Vector(-3, -0.5, 1), new Color(0.8, 0.3, 0.3), new Color(0.8, 0.8, 0.8))
const light2 = new Light(new Vector(3, 2, 1), new Color(0.4, 0.4, 0.9), new Color(0.8, 0.8, 0.8))

scene.addLight(light1)
scene.addLight(light2)

scene.renderScene();