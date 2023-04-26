#Zadanie skonczone
wynik = 0
for dycha in range(0,11):
    for piatka in range(0,21):
        for dwojka in range(0,51):
            if (dycha * 10 + piatka * 5 + dwojka * 2) == 100:
                wynik += 1

print(wynik)
print("koniec programu")