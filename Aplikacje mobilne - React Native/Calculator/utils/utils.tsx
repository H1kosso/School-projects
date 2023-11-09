import type {DimensionValue} from 'react-native';

export type array2Dims = {
    row: number,
    column: number
}

export function calculatePercentOccupation (count: number): DimensionValue {
    const wholeOccupation = 100;
    return `${wholeOccupation / count}%`;
}

export function get2DArrayDims<T>(arg: T[][]) :  array2Dims{
    return {row: arg.length, column: arg[0].length};
}
