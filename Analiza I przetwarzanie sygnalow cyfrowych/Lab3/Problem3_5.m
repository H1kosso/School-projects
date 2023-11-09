clear all; close all
% Orthogonal matrix for DCT-IV orthogonal transform
N = 100;                                    % wymiar macierzy kwadratowej, 25, 100
k = (0:N-1); n=(0:N-1);                     % k-kolumny/funkcje, n-wiersze/probki
S = sqrt(2/N)*cos(pi/N*(n'+1/2)*(k+1/2));   % macierz syntezy
A = S';                                     % macierz analizy: transpozycja i sprzezenie S

% S*A, pause % sprawdzenie ortogonalnosci: macierz z jedynkami na przekatnej?

x1 = 10*S(:,5);                                          % sygnal #1
x2 = 20*S(:,10);                                         % sygnal #2
x3 = 30*sqrt(2/N)*cos(pi/N*(n  +1/2)*(10.5+1/2) );      x3=x3';      % sygnal #3
x4 = 30*sqrt(2/N)*cos(pi/N*(n +N/4+1/2)*(10 +1/2) );    x4=x4';    % sygnal #4
x5 = randn(1,N);                                        x5=x5';     % sygnal #5
x = x2;                                                  % + x2; % wybor x1, x2, x3, x4, x1+x2, x1+x3, x1+x4
figure; plot(x,'bo-'); title('Sygnal wejściowy x(n)'); grid;              % rysunek sygnalu wejsciowego
size(A)
size(x)
c = A*x;                    % analiza sygnalu: wyznaczenie wspolczynnikow transformacji
figure; stem(c); title('Współczynniki transormacji'); grid;      % pokazanie wspolczynnikow transformacji
%c(5) = 0;                  % opcjonalne usuniecie skladowej x3 z sygnalu
y = S*c;                    % synteza sygnalu: suma przeskalowanych funkcji bazowych
figure; plot(y,'bo-'); title('Sygnał wyjściowy y(n)'); grid;         % rysunek sygnalu wyjsciowego
error = abs(x.'-y)                         % blad odtworzenia/rekonstrukcji sygnalu
errorAVg = mean(x)