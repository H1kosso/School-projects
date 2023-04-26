#Skończone
def mean_and_variance(lst, length, sum):
    if lst == []:
        mean = sum / length
        return mean, 0
    else:
        mean, variance = mean_and_variance(lst[1:], length, sum + lst[0])
        variance += (lst[0] - mean)**2
        if len(lst) == length:
            return variance / ( length-1), mean
    
    return mean, variance


def main():
    lista1 = [3, 3, 3, 3]
    lista2 = [5, 6, 7, 8, 9]
    
    length1 = len(lista1)
    length2 = len(lista2)
    
    sum1 = 0
    sum2 = 0
    
    result1 = mean_and_variance(lista1, length1, sum1)
    result2 = mean_and_variance(lista2, length2, sum2)
    
    print(result1)
    print(result2)


if __name__ == '__main__':
    main()