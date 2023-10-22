import { Point, Rectangle } from './rectangle';
import Book from './Book'
import { Animal, Dog, Cat } from './Animal';

//Zadanie 1
const pointA = new Point(0, 0);
console.log(`Punkt A: (${pointA.x}, ${pointA.y})`);

pointA.move(2, 3);
console.log(`Po przesunięciu Punkt A: (${pointA.x}, ${pointA.y})`);

const rectangle = new Rectangle(pointA, 4, 3);

rectangle.move(1, 1);
console.log(`Pole prostokąta: ${rectangle.getArea()}`);

//Zadanie 2

let books:Book[] =
    [
        {
            title: "PWSZ",
            author:'abc',
            publicationYear: 2002
        },
        {
            title: "ANS",
            author:'abc',
            publicationYear: 2000
        },
        {
            title: "AT",
            author:'abc',
            publicationYear: 2004
        }
    ]

let sum:number = 0;
books.forEach(a => sum += a.publicationYear);
console.log(sum);

// Zadanie 3

function concatenateArrays(array1:any[], array2:any[]) : any[]{
    return array1.concat(array2);
}

let ar1:number[] = [1,2,3,4,5,6];
let ar2:string[] = ['a', 'b', 'c'];

console.log(concatenateArrays(ar1, ar2));

// Zadanie 4
const myDog = new Dog("burek");
const myCat = new Cat("sierściuch");
console.log(myCat.makeSound());
console.log(myDog.makeSound());

//Zadanie 5

type MyCache = {
    [key: string]: number;
};

function cachedSum(cache: MyCache, arg1: number, arg2: number): number {
    const key = `${arg1}_${arg2}`;

    if (key in cache) {
        console.log(`Cache ${key}: ${cache[key]}`);
        return cache[key];
    } else {
        const result = arg1 + arg2;
        cache[key] = result;
        console.log(`New ${result} do cache dla ${key}`);
        return result;
    }
}

const myCache: MyCache = {};
const result1 = cachedSum(myCache, 2, 3);
const result2 = cachedSum(myCache, 2, 3);

console.log(result1);
console.log(result2);