#Skończone
class MyRange:
    def __init__(self, *args):
        self.a = 0.0
        self.b = 0.0
        self.k = 1.0

        if len(args) == 1:
            self.b = args[0]
        elif len(args) == 2:
            self.a = args[0]
            self.b = args[1]
        elif len(args) == 3:
            self.a = args[0]
            self.b = args[1]
            self.k = args[2]

        if self.k == 0 or len(args) < 1 or len(args) > 3:
            raise ValueError

        self.iterator = self.a

    def __iter__(self):
        return self

    def __next__(self):
        if (self.a < self.b and self.iterator < self.b) or (self.a > self.b and self.iterator > self.b):
            result = self.iterator
            self.iterator += self.k
            return result
        else:
            raise StopIteration


def main():
    mr = MyRange(1, 15, 0.5)
    for i in mr:
        print(i)


if __name__ == '__main__':
    main()