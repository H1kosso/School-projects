"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = exports.Point = void 0;
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.move = function (dx, dy) {
        this.x += dx;
        this.y += dy;
    };
    return Point;
}());
exports.Point = Point;
var Rectangle = /** @class */ (function () {
    function Rectangle(topLeft, width, height) {
        this.topLeft = topLeft;
        this.topRight = new Point(topLeft.x + width, topLeft.y);
        this.bottomLeft = new Point(topLeft.x, topLeft.y + height);
        this.bottomRight = new Point(topLeft.x + width, topLeft.y + height);
    }
    Rectangle.prototype.move = function (dx, dy) {
        this.topLeft.move(dx, dy);
        this.topRight.move(dx, dy);
        this.bottomLeft.move(dx, dy);
        this.bottomRight.move(dx, dy);
    };
    Rectangle.prototype.getArea = function () {
        var width = this.topRight.x - this.topLeft.x;
        var height = this.bottomLeft.y - this.topLeft.y;
        return width * height;
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
