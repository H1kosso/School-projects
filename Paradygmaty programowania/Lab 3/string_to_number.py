#Skończone
def change_words_to_number_from_20_to_59(input_string):
    numbers_dictionary = {
        'jeden': 1, 'dwa': 2, 'trzy': 3,
        'cztery': 4, 'pięć': 5, 'sześć': 6,
        'siedem': 7, 'osiem': 8, 'dziewięć': 9,
        'dwadzieścia': 20, 'trzydzieści': 30,
        'czterdzieści': 40, 'pięćdziesiąt': 50
    }
    splitted = input_string.split()
    result = 0
    for word in splitted:
        if word in numbers_dictionary:
            result += numbers_dictionary[word]

    return result


print(change_words_to_number_from_20_to_59('dwadzieścia jeden'))
print(change_words_to_number_from_20_to_59('czterdzieści pięć'))
print(change_words_to_number_from_20_to_59('pięćdziesiąt dziewięć'))