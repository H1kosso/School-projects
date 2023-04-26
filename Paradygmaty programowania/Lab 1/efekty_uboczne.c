// Zadanie skonczone

/*
    Dzieje się tak ponieważ argumenty wrzucane są na stos, więc w momencie którym wywołujemy tę funkcje na końcu
    to jest na wierzchu stosu, w momencie w którym zaczynamy pobierać te dane ze stosu
*/

#include <stdio.h>

int sum_and_product(int a, int b, int *product) {
    *product = a * b;   
    return a + b;       
}

int main() {
    int product;
    int product1;
    printf("Suma: %d, Iloczyn: %d\n", product, sum_and_product(5, 4, &product));
    printf("Suma: %d, Iloczyn: %d\n",  sum_and_product(5, 4, &product1), product1);
    return 0;
}