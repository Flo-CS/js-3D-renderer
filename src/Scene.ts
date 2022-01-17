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

export default class Scene {
    element: HTMLElement;
    image: Image;
    imagePlane: ImagePlane;
    camera: Camera;
    ambientLight: AmbientLight;
    lights: Light[];
    objs: Obj[];


    constructor(element: HTMLElement, image: Image, imagePlane: ImagePlane, camera: Camera) {
        this.element = element;
        this.image = image;
        this.imagePlane = imagePlane;
        this.camera = camera;

        this.objs = []
        this.lights = []
        this.ambientLight = new AmbientLight(new Color(0.5, 0.5, 0.5));
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

    getRayFromPixelsCoords(x: number, y: number): Ray {
        const xt = x / this.image.width

        const yt = (this.image.height - y - 1) / this.image.height

        const point = this.imagePlane.performBilinearInterpolation(xt, yt);

        return new Ray(point, point.minus(this.camera.position));
    }

    determineClosestIntersection(ray: Ray): Intersection | null {

        const intersections = this.objs.map((obj) => {
            const t = obj.computeIntersection(ray)

            if (!t) return null;

            const point = ray.at(t);
            const surfaceNormal = obj.computeSurfaceNormal(point)

            return {
                obj,
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

        const noShadowLights = this.lights.filter(light => !this.isObjInShadow(intersection.obj, intersection.point, light))

        return computePhongColor(intersection, this.ambientLight, noShadowLights, this.camera);
    }

    isObjInShadow(obj: Obj, point: Vector, light: Light) {
        const objs = this.objs.filter(t => t != obj);

        const shadowRay = new Ray(point, light.position.minus(point))

        return objs.some(obj => {

            const t = obj.computeIntersection(shadowRay)
            return t != null && t > 0 && t < 1;
        })
    }

    renderScene() {
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



