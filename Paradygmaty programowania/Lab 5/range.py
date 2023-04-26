#skończone
def my_range(*args):
    a = 0.0
    b = 0.0
    k = 1.0

    if len(args) == 1:
        b = args[0]
    elif len(args) == 2:
        a = args[0]
        b = args[1]
    elif len(args) == 3:
        a = args[0]
        b = args[1]
        k = args[2]

    if k == 0 or len(args) < 1 or len(args) > 3:
        raise ValueError

    result = []
    iterator = a

    while(a < b and iterator < b) or (a > b and iterator > b):
        result.append(iterator)
        iterator += k

    return result


def main():
    try:
        print("my_range(5.1, 2.2, -0.5) =>", end=" ")
        print(my_range(5.1, 2.2, -0.5))
    except ValueError:
        print("Wrong number of parameters")

    try:
        print("my_range(1.1, 2.1, 0.5) =>", end=" ")
        print(my_range(1.1, 2.1, 0.5))
    except ValueError:
        print("Wrong number of parameters")

    try:
        print("my_range(1.1, 2.2) =>", end=" ")
        print(my_range(1.1, 2.2))
    except ValueError:
        print("Wrong number of parameters")

    try:
        print("my_range(2.2) =>", end=" ")
        print(my_range(2.2))
    except ValueError:
        print("Wrong number of parameters")

    try:
        print("my_range(1.1, 2.1, 0.5, 5, 4) =>", end=" ")
        print(my_range(1.1, 2.1, 0.5, 5, 4))
    except ValueError:
        print("Wrong number of parameters")


if __name__ == '__main__':
    main()
