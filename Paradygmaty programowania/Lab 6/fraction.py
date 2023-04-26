#Skończone
class Fraction:
    numberOfFractions = []

    def __init__(self, *args):
        if len(args) == 2:
            self.numerator = args[0]
            self.denominator = args[1]
        elif len(args) == 1:
            inputNumber = str(args[0] - int(args[0]))[2:]
            self.numerator = int(inputNumber)
            self.denominator = 10 ** len(inputNumber)

        Fraction.numberOfFractions.append(self)

    def __str__(self):
        if self.numerator == 0:
            return "0"
        elif self.numerator == self.denominator:
            return "1"
        else:
            return str(int(self.numerator)) + "/" + str(int(self.denominator))

    def __add__(self, other):
        newNumerator = self.numerator * other.denominator + self.denominator * other.numerator
        newDenominator = self.denominator * other.denominator
        nwd = Fraction.NWD(newNumerator, newDenominator)
        return Fraction(newNumerator / nwd, newDenominator / nwd)

    def __sub__(self, other):
        newNumerator = self.numerator * other.denominator - self.denominator * other.numerator
        newDenominator = self.denominator * other.denominator
        nwd = Fraction.NWD(newNumerator, newDenominator)
        return Fraction(newNumerator / nwd, newDenominator / nwd)

    def __mul__(self, other):
        newNumerator = self.numerator * other.numerator
        newDenominator = self.denominator * other.denominator
        nwd = Fraction.NWD(newNumerator, newDenominator)
        return Fraction(newNumerator / nwd, newDenominator / nwd)

    def __truediv__(self, other):
        newNumerator = self.numerator * other.denominator
        newDenominator = self.denominator * other.numerator
        nwd = Fraction.NWD(newNumerator, newDenominator)
        return Fraction(newNumerator / nwd, newDenominator / nwd)

    @staticmethod
    def NWD(a, b):
        while b != 0:
            r = a % b
            a, b = b, r
        return a


def main():
    f1 = Fraction(1, 2)
    f2 = Fraction(4, 8)
    f3 = Fraction(0.33)
    sum = f1 + f2
    product = f1 * f1
    difference = f1 - f1
    quotient = f1 / f1

    print(f1, "+", f2, "=", sum)
    print(f1, "*", f1, "=", product)
    print(f1, "-", f1, "=", difference)
    print(f1, "/", f1, "=", quotient)

    print("0.33 = ", f3)
    print("Number of fractions: ", len(Fraction.numberOfFractions))


if __name__ == '__main__':
    main()
