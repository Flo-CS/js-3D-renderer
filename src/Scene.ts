import { getPhongColorAtIntersection as computePhongColor } from "./helpers/phongIlluminationModel";
import { Intersection } from "./helpers/types";
import { min } from "./helpers/utilities";
import Image from "./image/Image";
import ImagePlane from "./image/ImagePlane";
import AmbientLight from "./lights/AmbientLight";
import Light from "./lights/Light";
import Color from "./materials/Color";
import Camera from "./objs/Camera";
import Obj from "./objs/Obj";
import Ray from "./vectors/Ray";
import Vector from "./vectors/Vector";

const DEFAULT_MAX_LIGHT_BOUNCES = 3;
const DEFAULT_HORIZONTAL_SAMPLES_COUNT = 3;
const DEFAULT_VERTICAL_SAMPLES_COUNT = 3;

export default class Scene {
    element: HTMLElement;
    image: Image;
    imagePlane: ImagePlane;
    camera: Camera;
    ambientLight: AmbientLight;
    lights: Light[];
    objs: Obj[];
    maxLightBounces: number;
    horizontalSamplesCount: number;
    verticalSamplesCount: number;
    samplesCount: number;


    constructor(element: HTMLElement, image: Image, imagePlane: ImagePlane, camera: Camera, maxLightBounces: number = DEFAULT_MAX_LIGHT_BOUNCES, horizontalSamplesCount: number = DEFAULT_HORIZONTAL_SAMPLES_COUNT, verticalSamplesCount: number = DEFAULT_VERTICAL_SAMPLES_COUNT,) {
        this.element = element;
        this.image = image;
        this.imagePlane = imagePlane;
        this.camera = camera;

        this.objs = []
        this.lights = []
        this.ambientLight = new AmbientLight(new Color(0.5, 0.5, 0.5));

        this.maxLightBounces = maxLightBounces;
        this.horizontalSamplesCount = horizontalSamplesCount;
        this.verticalSamplesCount = verticalSamplesCount
        this.samplesCount = horizontalSamplesCount * verticalSamplesCount;
    }

    addObj(obj: Obj) {
        this.objs.push(obj)
    }

    addLight(light: Light) {
        this.lights.push(light)
    }

    setAmbientLight(ambientLight: AmbientLight) {
        this.ambientLight = ambientLight
    }

    getRaysFromPixelCoords(x: number, y: number): Ray[] {
        const rays = [];

        for (let sx = 0; sx < this.verticalSamplesCount; sx++) {
            for (let sy = 0; sy < this.horizontalSamplesCount; sy++) {
                const xSample = x + (sy / this.horizontalSamplesCount)
                const ySample = y + (sx / this.verticalSamplesCount)

                rays.push(this.getRayFromPixelCoords(xSample, ySample));
            }
        }
        return rays;
    }

    getRayFromPixelCoords(x: number, y: number): Ray {
        const xt = x / this.image.width
        const yt = (this.image.height - y - 1) / this.image.height

        const point = this.imagePlane.performBilinearInterpolation(xt, yt);
        return new Ray(point, point.minus(this.camera.position))
    }

    determineClosestIntersection(ray: Ray): Intersection | null {

        const intersections = this.objs.map((obj) => {
            const t = obj.computeIntersection(ray)

            if (!t) return null;

            const point = ray.at(t);
            const surfaceNormal = obj.computeSurfaceNormal(point)
            const viewVector = ray.direction.scale(-1).normalize()
            const reflectanceVector = surfaceNormal.scale(2).scale(viewVector.dot(surfaceNormal)).minus(viewVector);

            return {
                obj,
                t,
                point,
                surfaceNormal,
                viewVector,
                reflectanceVector
            }

        }).filter(intersection => intersection);

        return min(intersections, (intersection) => intersection.t);
    }

    isObjInShadow(obj: Obj, point: Vector, light: Light) {
        const objs = this.objs.filter(t => t != obj);

        const shadowRay = new Ray(point, light.position.minus(point))

        return objs.some(obj => {
            const t = obj.computeIntersection(shadowRay)
            return t != null && t > 0 && t < 1;
        })
    }

    getPixelColorFromCoords(x: number, y: number): Color {
        const rays = this.getRaysFromPixelCoords(x, y)

        let pixelColor = new Color();
        rays.forEach(ray => {
            pixelColor = pixelColor.add(this.getPixelColorForRay(ray));
        });

        return pixelColor.mix(1 / this.samplesCount);
    }

    getPixelColorForRay(ray: Ray, depth: number = this.maxLightBounces): Color {

        const intersection = this.determineClosestIntersection(ray)

        if (!intersection) return new Color();

        const noShadowLights = this.lights.filter(light => !this.isObjInShadow(intersection.obj, intersection.point, light))

        const color = computePhongColor(intersection, this.ambientLight, noShadowLights);

        if (depth <= 0) return color;

        const newRay = new Ray(intersection.point.add(intersection.reflectanceVector.scale(0.1)), intersection.reflectanceVector)

        return color.add(this.getPixelColorForRay(newRay, depth - 1).mix(intersection.obj.material.reflectivity));
    }

    renderScene() {
        for (let y = 0; y < this.image.height; y++) {
            for (let x = 0; x < this.image.width; x++) {

                const pixelColor = this.getPixelColorFromCoords(x, y)
                this.image.putPixel(x, y, pixelColor);
            }
        }

        this.image.renderInto(this.element)
    }

}



