#Skonczone
def leap_years(starting_year, finish_year):
    lista = [year for year in range(starting_year, finish_year + 1) if (year % 4 == 0 and year % 100 != 0) or year % 400 == 0]
    return lista


print(leap_years(1900, 2000))