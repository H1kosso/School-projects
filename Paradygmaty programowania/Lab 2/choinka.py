#Skonczone
level = 1

while level != 7:
    level = int(input("Podaj wysokosc choinki: "))
    if level % 2:
        character = "#"
    else:
        character = "*"

    for i in range(1, level+1):
        print(" " * (level - i), end="")
        print(character * (2 * i - 1))

print("Koniec programu")






