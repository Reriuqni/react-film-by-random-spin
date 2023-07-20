/**
 * Return the unique interger numbers
 * @param arr array of intergers and floats
 * @returns 
 */
function splitIntoWholeNumbers(arr: number[]): number[] {
    return [...new Set(
        arr.map(_ => ~~(_ % 10))
    )]
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

export {
    splitIntoWholeNumbers,
    getRandomInt
}