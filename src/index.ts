import Image from "./image/Image";
import ImagePlane from "./image/ImagePlane";
import Light from "./lights/Light";
import Color from "./materials/Color";
import Material from "./materials/Material";
import Scene from "./Scene";
import Camera from "./things/Camera";
import Sphere from "./things/Sphere";
import Vector from "./vectors/Vector";


// SETUP THE IMAGE AND THE PLANE REPRESENTING THE IMAGE
const WIDTH = 512;
const HEIGHT = 512;

// Keep same aspect ratio as the image
const IMAGE_PLANE_LEFT = -2;
const IMAGE_PLANE_RIGHT = 2;
const IMAGE_PLANE_TOP = 2;
const IMAGE_PLANE_BOTTOM = -2;
const IMAGE_PLANE_DEPTH = 0;

const image = new Image(WIDTH, HEIGHT);

const imagePlane = new ImagePlane(
    IMAGE_PLANE_LEFT, IMAGE_PLANE_RIGHT, IMAGE_PLANE_TOP, IMAGE_PLANE_BOTTOM, IMAGE_PLANE_DEPTH
)

// SETUP THE CAMERA
const camera = new Camera(new Vector(0, 0, 10))


// SETUP THE SCENE
const scene = new Scene(document.body, image, imagePlane, camera)

const redMaterial = new Material(
    new Color(0.9, 0, 0),
    new Color(0.7, 0.4, 0.4),
    new Color(0.7, 0.7, 0.7),
    20
)

const sphere1 = new Sphere(new Vector(-1.1, 0.6, -1), 0.2, redMaterial)
const sphere2 = new Sphere(new Vector(0.2, -0.1, -1), 0.5, redMaterial)
const sphere3 = new Sphere(new Vector(1.2, -0.5, -1.75), 0.4, redMaterial)

scene.addThing(sphere1)
scene.addThing(sphere2)
scene.addThing(sphere3)

const light1 = new Light(new Vector(-1, -0.5, 1), new Color(0, 0.6, 0), new Color(0.5, 0.5, 0.5))
const light2 = new Light(new Vector(3, 2, 1), new Color(0.4, 0.4, 0.4), new Color(0.5, 0.5, 0.5))

scene.addLight(light1)
scene.addLight(light2)

scene.renderScene();