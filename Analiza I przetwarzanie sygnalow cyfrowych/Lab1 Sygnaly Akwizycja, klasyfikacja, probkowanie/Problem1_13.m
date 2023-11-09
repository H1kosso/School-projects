clear all; 
load ECG100.mat;
whos;

x = val(1, :); 
plot(x);
title('Sygnał EKG');
xlabel('Czas [próbki]');
ylabel('Amplituda');

N = length(x);
bpm = 72; % Liczba uderzeń na minutę
fpr = bpm / 60; % Częstotliwość próbkowania - jest to równo znaczne udrzeniom serca na sekunde
dt = 1 / fpr;
t = dt * (0:N-1);
UP = 20; % Licznik
DOWN = 1; % Mianownik / (8000/400 = 20/1)
xup = resample(x, UP, DOWN); % Przepróbkowanie

sound(xup, 8000);
