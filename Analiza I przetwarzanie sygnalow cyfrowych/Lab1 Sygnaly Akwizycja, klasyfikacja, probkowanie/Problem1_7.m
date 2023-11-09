close all;
clear all;

[x, fpr] = audioread('MORSE.wav'); %8b 22050Hz
% 8000, 11025, 16000, 22050, 32000, 44100, 48000, 96000
fpr = 22050;
Nx = length(x); % pobierz liczbe probek
n= 0:Nx-1; % indeksy probek
dt = 1/fpr; % oblicz okres probkowania sygnalu
t = dt*n; % oblicz chwile probkowania
sound(x,fpr)

 % Odtwarzanie dźwięku przy innej częstotliwości próbkowania 
 % spowoduje zmianę jego prędkości. Niższa częstotliwość próbkowania
 % spowolni odtwarzany dźwięk, podczas gdy wyższa częstotliwość
 % próbkowania przyspieszy go.