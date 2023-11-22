#include <iostream>
#include <vector>
#include <complex>
#include <bitset>
#include <cmath>

int main()
{
    int N = 8; // liczba próbek sygnału (potęga dwójki)
    int Nbit = static_cast<int>(log2(N)); // liczba bitow potrzebna na indeksy probek, dla N=8, Nbits=

    std::cout << "Sygnal wejsciowy: x" << std::endl;
    std::vector<std::complex<double>> x(N); // przykładowy analizowany sygnał np. inny wybor x=randn(1,N)
    for (int i = 0; i < N; ++i) {
        x[i] = std::complex<double>(i, 0.0);
        std::cout << x[i].real() << " ";
    }

    // Przestawienie probek sygnału (odwracanie bitow numeru próbki)
    std::vector<std::complex<double>> y(N);
    for (int n = 0; n < N; n++) {
        int nc = n;
        int m = 0;
        for (int k = 0; k < Nbit; k++) {
            if (nc % 2) {
                m = m + static_cast<int>(std::pow(2, Nbit - k - 1));
                nc--;
            }
            nc /= 2;
        }
        y[m] = x[n];
    }
    std::cout << std::endl << "y" << std::endl;
    for( auto i : y)
        std::cout << i << " ";

    // Seria obliczen motylkowych
    std::cout << std::endl << std::endl << "Seria obliczen motylkowych" << std::endl;
    int Nlev = Nbit;


    for( int lev = 1 ; lev <= Nlev ; lev++){
        int bw = static_cast<int>(std::pow(2, lev - 1));                   //Szerokość motyka
        int nbb =  static_cast<int>(std::pow(2, lev - 1));                  // liczba motylkow w bloku
        int sbb= static_cast<int>(std::pow(2, lev));                         // przesuniecie pomiedzy blokami
        int nbl=N/static_cast<int>(std::pow(2, lev));;                       // liczba blokow

        std::complex<double> j(0.0, 1.0); // Definicja liczby zespolonej j
        std::complex<double> W = std::exp(-j * 2.0 * M_PI / std::pow(2.0, lev));
        W = std::complex<double>(std::round(W.real() * 1e10) / 1e10, std::round(W.imag() * 1e10) / 1e10); //  wspolczynnik korekcji

        //std::cout << "Wartosc W: " << W << std::endl;

        for( int bu = 1 ; bu <= nbb ; bu++){         // Motylki
            std::complex<double> Wb = std::pow(W, bu - 1);          //korekcja dla motylka

            for( int bl = 1 ; bl <= nbl ; bl++){                    //Bloki
                int up =  (bu-1) + (bl-1)*sbb;           // numer probki gornej
                int  down = bw + (bu-1) + (bl-1)*sbb;      // numer probki dolnej
                auto temp = Wb * y[down];
                y[down] = y[up] - temp;
                y[up] = y[up] + temp;
            }
        }
    }
    for(auto &i : y)
        std::cout << i << " ";
    return 0;
}
