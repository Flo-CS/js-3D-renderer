import { getPhongColorAtIntersection as computePhongColor } from "./helpers/phongIlluminationModel";
import { Intersection } from "./helpers/types";
import { min } from "./helpers/utilities";
import Image from "./image/Image";
import ImagePlane from "./image/ImagePlane";
import AmbientLight from "./lights/AmbientLight";
import Light from "./lights/Light";
import Color from "./materials/Color";
import Camera from "./things/Camera";
import Thing from "./things/Thing";
import Ray from "./vectors/Ray";
import Vector from "./vectors/Vector";

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

    determineClosestIntersection(ray: Ray): Intersection | null {

        const intersections = this.things.map((thing) => {
            const t = thing.computeIntersection(ray)

            if (!t) return null;

            const point = ray.at(t);
            const surfaceNormal = thing.computeSurfaceNormal(point)

            return {
                thing,
                t,
                point,
                surfaceNormal
            }
        }).filter(intersection => intersection);

        return min(intersections, (intersection) => intersection.t);
    }

    getColorAtIntersection(intersection: Intersection | null, ray: Ray): Color {
        if (!intersection) {
            return new Color(0, 0, 0);;
        }

        const noShadowLights = this.lights.filter(light => !this.isThingInShadow(intersection.thing, intersection.point, light))

        return computePhongColor(intersection, this.ambientLight, noShadowLights, this.camera);
    }

    isThingInShadow(thing: Thing, point: Vector, light: Light) {
        const things = this.things.filter(t => t != thing);

        const shadowRay = new Ray(point, light.position.minus(point))

        return things.some(thing => {

            const t = thing.computeIntersection(shadowRay)
            return t != null && t > 0 && t < 1;
        })


    }

    renderScene() {
        // DETERMINE RAYS INTERSECTIONS WITH OBJECTS (called "thing" because object is a reserved js keyword) IN THE SCENE

        for (let y = 0; y < this.image.height; y++) {
            for (let x = 0; x < this.image.width; x++) {
                const ray = this.getRayFromPixelsCoords(x, y)

                const intersection = this.determineClosestIntersection(ray)

                const color = this.getColorAtIntersection(intersection, ray);

                this.image.putPixel(x, y, color)

            }
        }

        this.image.renderInto(this.element)
    }

}



