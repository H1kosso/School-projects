#skończone
from timeit import default_timer as timer
def time_taken(func):
    def inner(*args):
        start = timer()
        result = func(*args)
        end = timer()
        print("Czas, który uplynął to: ", end - start)
        return result
    return inner


@time_taken
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

    while (a < b and iterator < b) or (a > b and iterator > b):
        result.append(iterator)
        iterator += k

    return result


def main():
    try:
        print("my_range(0, 500000, 0.1))")
        result = my_range(0, 500000, 0.1)
    except ValueError:
        print("Wrong number of parameters")
    
    try:
        print("my_range(0, 100, 1))")
        result = my_range(0, 100, 1)
    except ValueError:
        print("Wrong number of parameters")


if __name__ == '__main__':
    main()