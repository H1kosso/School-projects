#Skonczone 
input_string = str(input("Podaj zdanie w ktorym zostana zliczone 'a' i 'A': "))
result = 0
for char in input_string:
    if char == 'a' or char == 'A':
        result += 1

print("Wynik:", result)
print("Program zakonczony")