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




def main():
    shapes = [
        Circle("kolo", 2),
        Triangle("trojkat", 3, 4, 5),
        Rectangle("prostokat", 2, 4),
        Square("kwadrat", 2),
        Equilateral("rownoboczny", 3)
    ]

    for shape in shapes:
        print(shape.name + " " + str(shape.area()))


if __name__ == '__main__':
    main()
