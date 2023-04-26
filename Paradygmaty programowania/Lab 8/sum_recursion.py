#Skończone
def sumOfListTail(lst, sum = 0):
    if lst == []:
        return sum
    sum = sum + lst[0]
    return sumOfListTail(lst[1:], sum)


def sumOfList(lst):
    if lst == []:
        return 0
    return lst[0] + sumOfList(lst[1:])

def main():
    lista1 = [1, 2, 3, 4]
    lista2 = []

    print(sumOfListTail(lista1))
    print(sumOfListTail(lista2))

    print(sumOfList(lista1))
    print(sumOfList(lista2))


if __name__ == '__main__':
    main()


