// Zadanie skończone

#include <stdio.h>

int main() {
    int level = 1;
input:
    printf("Podaj liczbę poziomow: ");
    scanf("%d", &level);
    if (level < 1 || level > 40) goto input;

    char symbol = (level % 2 == 0) ? '*' : '#';
    int spaces = level - 1;

    int i = 1;
    loop1:
        if (i > level) goto end;

        int j = 1;
            loop2:
                if (j <= spaces) 
                    putchar(' ');
                if (j <= spaces)
                    j++;
                if (j <= spaces)
                    goto loop2;
                

        int k = 1;
            loop3:
                if (k <= 2*i-1) 
                    putchar(symbol);
                if (k <= 2*i-1)
                    k++;
                if (k <= 2*i-1)
                    goto loop3;
                

            putchar('\n');
            i++;
            spaces--;
            goto loop1;

    end:
    if (level != 7) goto input;
    
    //Sprawdzenie czy na pewno wszystko dobrze sie wykonało, ponieważ tutaj na stronie w konsoli nic nie wyskakuje po wykonanym programie
    puts("Program has returned 0");
    return 0;
}