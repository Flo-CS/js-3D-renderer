import AmbientLight from "./lights/AmbientLight";
import Camera from "./things/Camera"
import Image from "./image/Image";
import ImagePlane from "./image/ImagePlane";
import Light from "./lights/Light";
import Ray from "./vectors/Ray";
import Thing from "./things/Thing";
import Color from "./materials/Color";
import { calculateDiffuseTermForLight, getPhongColor } from "./helpers/phongIlluminationModel";
import Vector from "./vectors/Vector";
import { Intersection } from "./helpers/types";
import { min } from "./helpers/utilities";

export default class Scene {
    element: HTMLElement;
    image: Image;
    imagePlane: ImagePlane;
    camera: Camera;
    ambientLight: AmbientLight;
    lights: Light[];
    things: Thing[];


    constructor(element: HTMLElement, image: Image, imagePlane: ImagePlane, camera: Camera) {
        this.element = element;
        this.image = image;
        this.imagePlane = imagePlane;
        this.camera = camera;

        this.things = []
        this.lights = []
        this.ambientLight = new AmbientLight(new Color(0.5, 0.5, 0.5));
    }

    addThing(thing: Thing) {
        this.things.push(thing)
    }

    addLight(light: Light) {
        this.lights.push(light)
    }

    setAmbientLight(ambientLight: AmbientLight) {
        this.ambientLight = ambientLight

    }

    getRayFromPixelsCoords(x: number, y: number): Ray {
        const xt = x / this.image.width

        const yt = (this.image.height - y - 1) / this.image.height

        const point = this.imagePlane.performBilinearInterpolation(xt, yt);

        return new Ray(point, point.minus(this.camera.position));
    }

    determineClosestIntersection(ray: Ray): Intersection {

        const intersections = this.things.map((thing) => {
            const t = thing.computeIntersection(ray)

            return {
                thing,
                t
            }
        }).filter((intersection) => intersection.t)

        if (intersections.length == 0) return null;

        const minIntersection = min(intersections, (intersection) => intersection.t)

        return minIntersection;
    }

    computeColorAtIntersection(intersection: Intersection, ray: Ray): Color {

        if (intersection != null) {
            const { thing, t } = intersection;

            const point = ray.at(t)
            const surfaceNormal = thing.computeSurfaceNormal(point);

            return getPhongColor(thing.material, point, surfaceNormal, this.ambientLight, this.lights, this.camera)
        } else {
            return new Color()
        }
    }

    renderScene() {
        // DETERMINE RAYS INTERSECTIONS WITH OBJECTS (called "thing" because object is a reserved js keyword) IN THE SCENE

        for (let y = 0; y < this.image.height; y++) {
            for (let x = 0; x < this.image.width; x++) {
                const ray = this.getRayFromPixelsCoords(x, y)

                const intersection = this.determineClosestIntersection(ray)

                const color = this.computeColorAtIntersection(intersection, ray);

                this.image.putPixel(x, y, color)

            }
        }

        this.image.renderInto(this.element)
    }

}



