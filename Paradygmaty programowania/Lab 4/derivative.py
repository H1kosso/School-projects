#Skończone
import math

def derivative( f, x, h = 0.0001 ):
    return (f(x+h) - f(x))/h

def power2(x):
    return x**2

def main():
    print("sin(1): ", derivative(math.sin, 1))
    print("sin(0): ", derivative(math.sin, 0))
    print("1^2, h=0.00001: ", derivative(power2, 1, 0.00001))


if __name__ == '__main__':
    main()
