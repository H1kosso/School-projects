export class Point {
    constructor(public x: number, public y: number) {}
    move(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }
}


export class Rectangle {
    private topLeft: Point;
    private topRight: Point;
    private bottomLeft: Point;
    private bottomRight: Point;

    constructor(
        topLeft: Point,
        width: number,
        height: number
    ) {
        this.topLeft = topLeft;
        this.topRight = new Point(topLeft.x + width, topLeft.y);
        this.bottomLeft = new Point(topLeft.x, topLeft.y + height);
        this.bottomRight = new Point(topLeft.x + width, topLeft.y + height);
    }

    move(dx: number, dy: number): void {
        this.topLeft.move(dx, dy);
        this.topRight.move(dx, dy);
        this.bottomLeft.move(dx, dy);
        this.bottomRight.move(dx, dy);
    }

    getArea(): number {
        const width = this.topRight.x - this.topLeft.x;
        const height = this.bottomLeft.y - this.topLeft.y;
        return width * height;
    }
}