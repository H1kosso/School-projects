
#Zadanie skonczone
import random

randomed_number = random.randint(1,10)
number_of_tries = 0

while number_of_tries < 3:
    your_number = int(input("Podaj liczbe: "))
    if your_number == randomed_number:
        print("Brawo udalo ci sie odgadnac")
        break
    elif your_number > randomed_number:
        print("Za duzo")
    else:
        print("Za malo")
    number_of_tries += 1
else:
    print("Nie udalo Ci sie, liczba ktorej nie zgadles to:", randomed_number)
print("Koniec programu")