clear all; close all;
fpr=8000; Nx=80000; % czestotliwosc probkowania, liczba probek
dt = 1/fpr; % okres probkowania
t = dt*(0:Nx-1); % chwile pobierania probek

% Składniki sygnału
x1 = sin(2*pi*10*t); % sinus 10 Hz
x2 = sin(2*pi*1*t); % sinus 1 Hz
x3 = exp(-5*t); % eksponenta opadajaca w czasie
x4 = exp(-25*(t-0.5).^2); % gaussoida
x5 = sin(2*pi*(0*t+0.5*20*t.^2)); % liniowy przyrost czest. (LFM): od 0 Hz, +20Hz/s

% Modulacja częstotliwości (FM)
x6 = sin(2*pi*(30*t-(9/(2*pi*1)*cos(2*pi*1*t)))); % zwiększona częstotliwość modulacji

% Kumulacyjna modulacja częstotliwości (FM)
x7 = sin(2*pi*(10*t+9*cumsum(x2)*dt)); % to samo co x6; dlaczego?

% Składnik przypominający syrenę
syrena = zeros(1, Nx);

% Dodaj składniki do sygnału syreny
syrena = syrena + x1;
syrena = syrena + 0.5 * x5; % Zmniejsz amplitudę LFM, aby była mniej dominująca
syrena = syrena + 0.5 * x6; % Zwiększ amplitudę FM

% Normalizuj amplitudę, aby uniknąć przekroczenia zakresu
syrena = syrena / max(abs(syrena));

% Odtwarzaj sygnał
sound(syrena, fpr)

% Wyświetl sygnał
figure; plot(t, syrena, 'o-'); grid; title('Sygnał Syreny'); xlabel('czas [s]'); ylabel('Amplituda');
