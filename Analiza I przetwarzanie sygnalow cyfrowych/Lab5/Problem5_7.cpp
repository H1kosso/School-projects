#include <iostream>
#include <vector>
#include <complex>
#include <cmath>
#include <bitset>


std::vector<std::complex<double>> add(const std::vector<std::complex<double>>& wektor1, const std::vector<std::complex<double>>& wektor2) {

    std::vector<std::complex<double>> sum;
    for (std::size_t i = 0; i < wektor1.size(); ++i) {
        sum.push_back(wektor2[i] + wektor1[i]);
    }

    return sum;
}
std::vector<std::complex<double>> mul(const std::vector<std::complex<double>>& wektor1, const std::vector<std::complex<double>>& wektor2) {

    std::vector<std::complex<double>> prod;
    for (std::size_t i = 0; i < wektor1.size(); ++i) {
        prod.push_back(wektor1[i] * wektor2[i]);
    }
    return prod;
}

int main() {
    int N = 8; // liczba próbek sygnału (potęga dwójki)

    std::cout << "Sygnal wejsciowy: x" << std::endl;
    std::vector<std::complex<double>> x(N); // przykładowy analizowany sygnał np. inny wybor x=randn(1,N)
    for (int i = 0; i < N; ++i) {
        x[i] = std::complex<double>(i, 0.0);
        std::cout << x[i].real() << " ";
    }

    int Nbits = static_cast<int>(log2(N)); // liczba bitow potrzebna na indeksy probek, dla N=8, Nbits=3

    // Przestawienie probek sygnału (odwracanie bitow numeru próbki)
    std::cout << std::endl << "Indeksy probek: n" << std::endl;
    std::vector<unsigned long> n(N); // indeksy WSZYSTKICH probek
    for (int i = 0; i < N; ++i) {
        n[i] = i;
        std::cout << n[i] << " ";
    }

    std::cout << std::endl << "Bity tych indeksow: m" << std::endl;
    std::vector<std::bitset<3>> m(N); // bity tych indeksów
    for (int i = 0; i < N; i++) {
        m[i] = std::bitset<3>(n[i]);
        std::cout << m[i] << " ";
    }

    std::cout << std::endl << "Odwrocone bity: m" << std::endl;
    for (int i = 0; i < N; i++) {
        auto tmp = m[i];
        for (int j = 0; j < Nbits; j++) {
            m[i][j] = tmp[Nbits - j - 1];
        }
        std::cout << m[i] << " ";
    }

    std::cout << std::endl << "Nowe indeksy wszystekich probek: m" << std::endl;
    for (int i = 0; i < N; i++)
        std::cout << m[i].to_ulong() << " ";

    std::cout << std::endl << "Przestawione dane wejsciowe: y" << std::endl;
    std::vector<std::complex<double>> y(N);
    for (int i = 0; i < N; i++) {
        y[i] = m[i].to_ulong();
        std::cout << y[i].real() << " ";
    }

    // Wszystkie 2-punktowe DFTs na sasiednich parach probek (po ich przestawieniu)
    std::vector<std::vector<double>> transformMatrix = {{1, 1}, {1, -1}};
    std::vector<std::complex<double>> temp(N);

    for (int i = 0; i < N; i += 2) {
        temp[i] = transformMatrix[0][0] * y[i].real() + transformMatrix[0][1] * y[i + 1].real();
        temp[i + 1] = transformMatrix[1][0] * y[i].real() + transformMatrix[1][1] * y[i + 1].real();
    }

    // Transponowanie wyniku
    std::vector<std::complex<double>> result(N);
    for (int i = 0; i < N; ++i) {
        result[i] = temp[i];
    }

    std::cout << std::endl << "pomnozenie przez macierz transpozycji: y" << std::endl;
    for (auto i : result)
        std::cout << i << " ";


    // Rekonstrukcja N-punktowego DFT z 2-punktowych
    // Widma DFT: 2-punktowe --> 4-punktowe --> 8-punktowe --> 16-punktowe ...

    int Nx = N;                                 // liczba probek (zmiana nazwy zmiennej)
    int Nlevels = Nbits;                        // liczba etapow obliczeniowych rowna log2(Nx)
    N = 2;                                      // poczatkowa dlugosc DFT po 2-punktowych DFT

    for( int lev = 2 ; lev <= Nlevels ; lev++){
        N *= 2;                                     // nowa długość widma DFT po połączeniu
        int Nblocks = Nx/N;                    // nowa liczba widm DFT po polaczeniu

        std::vector<std::complex<double>> W(N);
        for (int i = 0; i < N; ++i) {
            double angle =  -2.0 * M_PI / N * i;
            W[i] = std::exp(std::complex<double>(0, angle));
            W[i] = std::complex<double>(std::round(W[i].real() * 1e10) / 1e10,
                                        std::round(W[i].imag() * 1e10) / 1e10);
        }


        for(int k = 1 ; k <= Nblocks ; k++){

            // Extract y1 and y2
            int first1 =  (k - 1) * N;
            int last1 = N / 2 + (k - 1) * N;
            int first2 =  N/2+1 + (k-1)*N - 1;
            int last2 = N + (k-1)*N;

            std::vector<std::complex<double>> y1;
            std::vector<std::complex<double>> y2;

            std::copy(result.begin() + first1, result.begin() + last1, std::back_inserter(y1));
            std::copy(result.begin() + first2, result.begin() + last2, std::back_inserter(y2));


            //Laczenie
            std::vector<std::complex<double>> y1y1;
            std::vector<std::complex<double>> y2y2;
            for(int z = 0 ; z < 2 ; z++){
                for(auto i : y1){
                    y1y1.push_back(i);
                }
                for(auto i : y2){
                    y2y2.push_back(i);
                }
            }

            auto wy2 = mul(W, y2y2);
            auto tmpRes = add(wy2, y1y1);
            result.erase(result.begin() + first1, result.begin() + last2);
            if(k%2 ==1)
                result.insert(result.begin(), tmpRes.begin(), tmpRes.end());
            else
                result.insert(result.end(), tmpRes.begin(), tmpRes.end());
        }
    }

    std::cout << std::endl << "Rekonstruowane dane wyjsciowe: y" << std::endl;
    for (auto i : result)
        std::cout << i << " ";
    std::cout << std::endl;
    return 0;
}
