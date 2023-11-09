clear all; close all
% Orthogonal matrix for DCT-IV orthogonal transform
N = 100;                                    % wymiar macierzy kwadratowej, 25, 100
k = (0:N-1); 
n = (0:N-1);                     % k-kolumny/funkcje, n-wiersze/probki
S = sqrt(2/N)*cos(pi/N*(n'+1/2)*(k+1/2));   % macierz syntezy
A = S';                                     % macierz analizy: transpozycja i sprzezenie S

% S*A, pause % sprawdzenie ortogonalnosci: macierz z jedynkami na przekatnej?

x1 = 10*S(:,5);                                          % sygnal #1
x2 = 20*S(:,10);                                         % sygnal #2
x3 = 30*sqrt(2/N)*cos(pi/N*(n'  +1/2)*(10.5+1/2) );      % sygnal #3
x4 = 30*sqrt(2/N)*cos(pi/N*(n' +N/4+1/2)*(10 +1/2) );    % sygnal #4
x5 = randn(1,N);                                        x5=x5';     % sygnal #5
x = x4;                                                  % + x2; % wybor x1, x2, x3, x4, x1+x2, x1+x3, x1+x4

figure; % sygnał wejściowy
subplot(221); plot(x1,'bo-'); title('Sygnal wejściowy x1'); grid;              % rysunek sygnalu wejsciowego
subplot(222); plot(x2,'bo-'); title('Sygnal wejściowy x2'); grid;              % rysunek sygnalu wejsciowego
subplot(223); plot(x3,'bo-'); title('Sygnal wejściowy x3'); grid;              % rysunek sygnalu wejsciowego
subplot(224); plot(x4,'bo-'); title('Sygnal wejściowy x4'); grid;              % rysunek sygnalu wejsciowego

c = A*x; % analiza sygnalu: wyznaczenie wspolczynnikow transformacji      
figure; % pokazanie wspolczynnikow transformacji
subplot(221); stem(A*x1); title('Współczynniki transormacji x1'); grid;      
subplot(222); stem(A*x2); title('Współczynniki transormacji x2'); grid;
subplot(223); stem(A*x3); title('Współczynniki transormacji x3'); grid;
subplot(224); stem(A*x4); title('Współczynniki transormacji x4'); grid;
%c(5) = 0;                  % opcjonalne usuniecie skladowej x3 z sygnalu

y = S*c;                    % synteza sygnalu: suma przeskalowanych funkcji bazowych

figure; % rysunek sygnalu wyjsciowego
subplot(221); plot(S*(A*x1),'bo-'); title('Sygnał wyjściowy y1'); grid;        
subplot(222); plot(S*(A*x2),'bo-'); title('Sygnał wyjściowy y2'); grid;
subplot(223); plot(S*(A*x3),'bo-'); title('Sygnał wyjściowy y3'); grid;
subplot(224); plot(S*(A*x4),'bo-'); title('Sygnał wyjściowy y4'); grid;


error = max(abs(x1.'-y));   % blad odtworzenia/rekonstrukcji sygnalu
errorAVg = mean(error)

pause; close all;
S =     sqrt(2/N)*cos(pi/N*(n'  +1/2    )*(k    + 1/2));    % macierz syntezy

figure; %sygnał 3 rozne k - parametr czestotliwosci
x3 = 30*sqrt(2/N)*cos(pi/N*(n'  +1/2    )*(9     + 1/2));   
subplot(221); stem(A*x3); title('Współczynniki transormacji x3, k=9'); grid;
x3 = 30*sqrt(2/N)*cos(pi/N*(n'  +1/2    )*(10.25 + 1/2));    
subplot(222); stem(A*x3); title('Współczynniki transormacji x3, k=10.25'); grid;
x3 = 30*sqrt(2/N)*cos(pi/N*(n'  +1/2    )*(10.75 + 1/2));    
subplot(223); stem(A*x3); title('Współczynniki transormacji x3, k=10.75'); grid;
x3 = 30*sqrt(2/N)*cos(pi/N*(n'  +1/2    )*(11    + 1/2));    
subplot(224); stem(A*x3); title('Współczynniki transormacji x3, k=11'); grid;


S =     sqrt(2/N)*cos(pi/N*(n'  +1/2    )*(k + 1/2));    % macierz syntezy
figure; %sygnał 3 rozne n - parametr czasu
x4 = 30*sqrt(2/N)*cos(pi/N*(n' +1/2)*(0 +1/2) );   
subplot(221); stem(A*x4); title('Współczynniki transormacji x4, n=0'); grid;
x4 = 30*sqrt(2/N)*cos(pi/N*(n' +1/2+1/2)*(0.5 +1/2) );    
subplot(222); stem(A*x4); title('Współczynniki transormacji x4, n=0.5'); grid;
x4 = 30*sqrt(2/N)*cos(pi/N*(n' +1+1/2)*(1 +1/2) );  
subplot(223); stem(A*x4); title('Współczynniki transormacji x4, n=1'); grid;
x4 = 30*sqrt(2/N)*cos(pi/N*(n' +10+1/2)*(10 +1/2) );
subplot(224); stem(A*x4); title('Współczynniki transormacji x4, n=10'); grid;







