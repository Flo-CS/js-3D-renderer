import { scale } from "./utilities";

export default class Color {
    red: number;
    green: number;
    blue: number;

    constructor(red?: number, green?: number, blue?: number) {
        this.red = red || 0;
        this.green = green || 0;
        this.blue = blue || 0;
    }

    normalize() {
        return new Color(
            scale(this.red, 0, 1, 0, 255),
            scale(this.green, 0, 1, 0, 255),
            scale(this.blue, 0, 1, 0, 255)
        )
    }
}