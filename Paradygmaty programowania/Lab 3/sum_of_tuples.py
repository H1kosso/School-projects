#Skończone
def sum_of_tuples(list_of_tuples):
    result_list = []
    for pair in list_of_tuples:
        result_list.append(pair[0] + pair[1])

    return result_list


list_of_numbers = [(1, 2), (3, 4), (5, 6), (7, 8)]
list_of_strings = [('a', 'b'), ('a', 'c'), ('b', 'c')]

print(sum_of_tuples(list_of_numbers))
print(sum_of_tuples(list_of_strings))