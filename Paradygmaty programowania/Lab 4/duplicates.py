#Skończone
def duplicates(set1, set2):
    list_of_duplicates = list(set([element for element in set1 if element in set2]))
    return list_of_duplicates


def main():
    set1 = [3, 4, 5, 6, 7]
    set2 = [1, 2, 3, 6, 7]
    list_of_duplicates = duplicates(set1, set2)
    print(list_of_duplicates)


if __name__ == '__main__':
    main()