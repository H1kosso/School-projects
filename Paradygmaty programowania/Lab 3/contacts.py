#Skończone
def find_a_number(input_dictionary, last_name):
    output_list = []
    for person, number in input_dictionary.items():
        if person[1] == last_name:
            output_list.append(number)

    return output_list


kontakty = {('Jan', 'Kowalski'): "123456789",
            ('Adam', 'Nowak'): "987654321",
            ('Adam', 'Kowalski'): "600300900"}

print(find_a_number(kontakty, 'Kowalski'))