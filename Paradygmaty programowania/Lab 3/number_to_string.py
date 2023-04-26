#Skończone
def change_numbers_to_words(string_to_change):
    number_dictionary = {'0': 'zero', '1': 'jeden', '2': 'dwa',
                         '3': 'trzy', '4': 'cztery', '5': 'piec',
                         '6': 'szesc', '7': 'siedem', '8': 'osiem',
                         '9': 'dziewiec'}

    output_string = ''

    for char in string_to_change:
        if char in number_dictionary.keys():
            output_string += number_dictionary[char] + ' '

    return output_string


print(change_numbers_to_words('ala 1 ma kota 2 pies 9 mysz 6'))
