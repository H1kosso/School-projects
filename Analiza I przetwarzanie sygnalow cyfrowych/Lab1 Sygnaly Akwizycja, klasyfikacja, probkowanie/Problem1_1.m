% cps_01_sinus.m
clear all; close all;

fpr=1000; Nx=1000; % parametry: czestotliwosc probkowania, liczba probek
%fpr=8000; Nx=3*fpr;
dt = 1/fpr; % okres probkowania
n = 0 : Nx-1; % numery probek
t = dt*n; % chwile probkowania

% sinusoida: amplituda, czestotliwosc, faza
%Wygeneruj sume trzech sinusoid o róznych czestotliwosciach, wiekszych niz 
% z 100 Hz i mniejszych niz 4000 Hz
A1 = 0.5 ; f1 = 10; p1=pi/2; 
A2 = 0.77; f2 = 50; p2=pi/10;
A3 = 0.56; f3 = 20; p3=pi/6;


x1 = A1*sin(2*pi*f1 *t+p1); % pierwszy skladnik sygnalu
x2 = A2*sin(2*pi*f2 *t+p2); % drugi skladnik
x3 = A3*sin(2*pi*f3 *t+p3); % trzeci skladnik

% wybor skladowych: 
x = x1 + 0.123*x2 + 0.456*x3;

plot(t,x1,'o- red', t,x2,'o- blue', t,x3, 'o- green'); 
grid; title('Sygnal x(t)'); xlabel('Czas [s]'); ylabel('Amplituda');
pause;
plot(t,x, 'o-')
sound(x, fpr)
