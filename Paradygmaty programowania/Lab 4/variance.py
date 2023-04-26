#Skończone
def varriance(x):
    sum_x = 0
    for number in x:
        sum_x = sum_x + number

    mean_x = sum_x * 1 / len(x)

    sum_in_varriance = 0
    for number in x:
        sum_in_varriance = sum_in_varriance + (number - mean_x) ** 2

    varriance_x = 1 / (len(x) - 1) * sum_in_varriance

    return varriance_x, mean_x

def addToList(number, list = None ):
    if list == None:
        list[0] = number
    else:
        list.append(number)
    return list


def main():
    print("Podaj liczby do listy - 0 konczy wprowadzanie")
    user_input = 1
    user_list = []
    while user_input != 0:
        user_input = int(input("Podaj liczbe: "))
        if user_input != 0:
            addToList(user_input, user_list)

    wariancja, srednia = varriance(user_list)
    print("Srednia wynosi: ", srednia)
    print("Wariancja wynosi: ", wariancja)

    wariancja, srednia = varriance([3,3,3,3])
    print("Srednia wynosi: ", srednia)
    print("Wariancja wynosi: ", wariancja)

    wariancja, srednia = varriance([5,6,7,8,9])
    print("Srednia wynosi: ", srednia)
    print("Wariancja wynosi: ", wariancja)


if __name__ == '__main__':
    main()
