#skończone
from abc import ABC, abstractmethod
import math


class Shape(ABC):
    def __init__(self, name):
        self.__name = name

    @property
    def name(self):
        return self.__name

    @abstractmethod
    def area(self):
        pass


class Circle(Shape):
    def __init__(self, name, radius):
        super().__init__(name)
        self.__radius = radius

    def area(self):
        return math.pi * self.__radius * self.__radius


class Triangle(Shape):
    def __init__(self, name, sideA, sideB, sideC):
        super().__init__(name)
        self.__sideA = sideA
        self.__sideB = sideB
        self.__sideC = sideC

    def area(self):
        p = (self.__sideA + self.__sideB + self.__sideC) / 2
        area = math.sqrt(p * (p - self.__sideA) * (p - self.__sideB) * (p - self.__sideC))
        return area


class Rectangle(Shape):
    def __init__(self, name, sideA, sideB):
        super().__init__(name)
        self.__sideA = sideA
        self.__sideB = sideB

    def area(self):
        return self.__sideA * self.__sideB


class Square(Rectangle):
    def __init__(self, name, side):
        super().__init__(name, side, side)


class Equilateral(Triangle):
    def __init__(self, name, side):
        super().__init__(name, side, side, side)


class AreaMixin:
    def area(self, sides):
        sum = 0
        for shape in sides:
            sum = sum + shape.area()
        return sum


class Tetrahedron(AreaMixin, Shape):
    def __init__(self, name, side):
        super().__init__(name)
        self.__triangle = Equilateral("triangle", side)
        self.__sides = [self.__triangle, self.__triangle, self.__triangle, self.__triangle]

    def areaOfBlock(self):
        return self.area(self.__sides)


class Cube(AreaMixin, Shape):
    def __init__(self, name, side):
        super().__init__(name)
        self.__square = Square("square", side)
        self.__sides = [self.__square, self.__square, self.__square, self.__square, self.__square, self.__square]

    def areaOfBlock(self):
        return self.area(self.__sides)


class Piramide(AreaMixin, Shape):
    def __init__(self, name, side):
        super().__init__(name)
        self.__square = Square("square", side)
        self.__triangle = Equilateral("triangle", side)
        self.__sides = [self.__square, self.__triangle, self.__triangle, self.__triangle, self.__triangle ]

    def areaOfBlock(self):
        return self.area(self.__sides)


def main():
    shapes = [
        Tetrahedron("czworoscian", 9),
        Cube("Szescian", 2),
        Piramide("Piramida", 2)
    ]

    for shape in shapes:
        print(shape.name + " " + str(shape.areaOfBlock()))


if __name__ == '__main__':
    main()