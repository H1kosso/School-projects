#skończone
import math

def bisection(f, x1, x2, eps):
    if f(x1) * f(x2) > 0:
        print("Nie ma miejsca zerowego")
        return None;
    while abs(x2 - x1) > eps:
        xm = (x1 + x2) / 2
        if f(xm) == 0:
            return xm
        elif f(x1) * f(xm) < 0:
            x2 = xm
        else:
            x1 = xm
    return xm


def polynomial(x):
    return x ** 3 - 2 * x ** 2 + 4 * x - 1


def testFunc(x):
    return math.sin(x * x - x + 1/3.0) + 0.5 * x


def main():
    print("sin(x), (-1.5,1):", bisection(math.sin, -1.5, 1.0, 0.001))
    print("y=x^3-2x^2+4x-1, (-10,10): ", bisection(polynomial, -10, 10, 0.001))
    print("sin(x*x-x+1/3.0)+0.5*x, (-1.1, -1.0): ", bisection(testFunc, -1.1, -1.0, 0.00000000000001))


if __name__ == '__main__':
    main()