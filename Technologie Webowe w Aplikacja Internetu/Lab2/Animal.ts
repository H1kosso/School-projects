export class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    makeSound(): string {
        return "";
    }
}

export class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }

    makeSound(): string {
        return "Woof! Woof!";
    }
}

export class Cat extends Animal {
    constructor(name: string) {
        super(name);
    }

    makeSound(): string {
        return "Meow! Meow!";
    }
}

export default {
    Animal,
    Cat,
    Dog
}