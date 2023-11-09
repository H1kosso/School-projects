"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rectangle_1 = require("./rectangle");
var Animal_1 = require("./Animal");
//Zadanie 1
var pointA = new rectangle_1.Point(0, 0);
console.log("Punkt A: (".concat(pointA.x, ", ").concat(pointA.y, ")"));
pointA.move(2, 3);
console.log("Po przesuni\u0119ciu Punkt A: (".concat(pointA.x, ", ").concat(pointA.y, ")"));
var rectangle = new rectangle_1.Rectangle(pointA, 4, 3);
rectangle.move(1, 1);
console.log("Pole prostok\u0105ta: ".concat(rectangle.getArea()));
//Zadanie 2
var books = [
    {
        title: "PWSZ",
        author: 'abc',
        publicationYear: 2002
    },
    {
        title: "ANS",
        author: 'abc',
        publicationYear: 2000
    },
    {
        title: "AT",
        author: 'abc',
        publicationYear: 2004
    }
];
var sum = 0;
books.forEach(function (a) { return sum += a.publicationYear; });
console.log(sum);
// Zadanie 3
function concatenateArrays(array1, array2) {
    return array1.concat(array2);
}
var ar1 = [1, 2, 3, 4, 5, 6];
var ar2 = ['a', 'b', 'c'];
console.log(concatenateArrays(ar1, ar2));
// Zadanie 4
var myDog = new Animal_1.Dog("burek");
var myCat = new Animal_1.Cat("sierściuch");
console.log(myCat.makeSound());
console.log(myDog.makeSound());
function cachedSum(cache, arg1, arg2) {
    var key = "".concat(arg1, "_").concat(arg2);
    if (key in cache) {
        console.log("Wynik z cache dla ".concat(key, ": ").concat(cache[key]));
        return cache[key];
    }
    else {
        var result = arg1 + arg2;
        cache[key] = result;
        console.log("Obliczono i zapisano wynik ".concat(result, " do cache dla ").concat(key));
        return result;
    }
}
var myCache = {};
var result1 = cachedSum(myCache, 2, 3);
var result2 = cachedSum(myCache, 2, 3);
console.log(result1);
console.log(result2);
