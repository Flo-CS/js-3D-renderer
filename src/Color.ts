export default class Color {
    red: number;
    green: number;
    blue: number;

    constructor(red?: number, green?: number, blue?: number) {
        this.red = red || 0;
        this.green = green || 0;
        this.blue = blue || 0;
    }
}