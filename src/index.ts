import Color from "./Color";
import Image from "./Image";

const WIDTH = 256;
const HEIGHT = 192;

const image = new Image(WIDTH, HEIGHT);

for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
        const color = new Color(
            x / WIDTH * 256, (HEIGHT - y) / HEIGHT * 256, 256 / 2
        );
        image.putPixel(x, y, color);

    }
}

image.renderInto(document.body);