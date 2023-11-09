import { useState } from "react";

interface ArithmeticStack<T extends string | number>{
    push: (element: T) => void,
    pop: () => T | undefined,
    head: () => T | undefined,
    replace: (element: T, numberOfElemets?: number) => void,
    isHeadAnOperator: () => boolean,
    isHeadFloatingNumber: () => boolean,
    isEmpty: () => boolean,
    clear: (clearingValue?: T[]) => void,
    toString: () => string,
    getHeadNumber: () => NumberInfo
}

type NumberInfo = {
    numberOfDigits: number,
    value: string
}

export default function useAritmeticStack<T extends string>(initialValue: T[] = new Array<T>): ArithmeticStack<T>{
    const [stack, setStack] = useState<T[]>(initialValue);
    const arithmeticOperators: string[] = ['+', '-', '/', '*'];
    const dot: string = '.';

    const push = (element: T): void => {
        setStack(stack.concat(element));
    }

    const pop = (): T | undefined =>{
        const lastElement = stack.at(-1);

        setStack(stack.slice(0, -1))
        return lastElement;
    }

    const head = (): T | undefined => {
        return stack.at(-1);
    }

    const replace = (element: T, numberOfElemets = 1): void => {
        setStack(stack.slice(0, -numberOfElemets).concat(element));
    }

    const isHeadAnOperator = (): boolean => {
        const allOperands: string[] = arithmeticOperators.concat(dot);
        return allOperands.includes(head() || '');
    }

    const isHeadFloatingNumber = (): boolean => {
        return getHeadNumber().value.includes(dot)
    }

    const isEmpty = (): boolean => {
        return stack.length === 0;
    }

    const clear = (clearingValue: T[] = new Array<T>): void => {
        setStack(clearingValue);
    }

    const toString = (): string => {
        return stack.reduce((acc: string, val: T) => acc + val, "");
    }

    const getHeadNumber = (): NumberInfo => {
        const isOperator = (val: string) => arithmeticOperators.includes(val);

        let number = '';
        let digitCount = 0;
        for (let i = stack.length - 1; 0 <= i; --i){
            let digit = stack.at(i);
            if ( !isOperator( digit || '') ){
                ++digitCount
                number = digit + number;
            }
            else
                break;
        }

        let numberInfo: NumberInfo ={
            numberOfDigits: digitCount,
            value: number
        }

        return numberInfo;
    }
    

    return { push, pop, head, replace, isHeadAnOperator, isHeadFloatingNumber, isEmpty, clear, toString, getHeadNumber}
}