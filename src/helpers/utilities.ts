export function scale(number: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export function clamp(number: number, min: number, max: number) {
    if (number < min) {
        return min;
    } else if (number > max) {
        return max;
    }
    return number;
}

export function min(arr: any[], fn?: (o: any) => number): any | null {
    let minValue = Infinity;
    let minElement = null;

    for (let element of arr) {
        const value = (fn && fn(element)) || element;
        if (value < minValue) {
            minValue = value;
            minElement = element;
        }
    }

    return minElement
}


