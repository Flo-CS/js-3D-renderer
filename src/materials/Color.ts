import { clamp } from "../helpers/utilities";

export default class Color {
    red: number;
    green: number;
    blue: number;

    constructor(red: number = 0, green: number = 0, blue: number = 0) {
        this.red = red
        this.green = green
        this.blue = blue

        this.clamp();
    }

    mix(color: Color | number): Color {
        if (typeof color == "number") {
            return new Color(this.red * color, this.green * color, this.blue * color)
        }
        return new Color(this.red * color.red, this.green * color.green, this.blue * color.blue)
    }
    add(color: Color) {
        return new Color(this.red + color.red, this.green + color.green, this.blue + color.blue)
    }

    clamp() {
        this.red = clamp(this.red, 0, 1);
        this.green = clamp(this.green, 0, 1);
        this.blue = clamp(this.blue, 0, 1);
    }
}