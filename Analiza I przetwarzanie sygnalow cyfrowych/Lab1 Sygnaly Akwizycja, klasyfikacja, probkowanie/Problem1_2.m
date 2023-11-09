% cps_01_sinus.m
clear all; close all;

%fpr=1000; Nx=1000; % parametry: czestotliwosc probkowania, liczba probek
fpr=8000; Nx=3*fpr;
dt = 1/fpr; % okres probkowania
n = 0 : Nx-1; % numery probek
t = dt*n; % chwile probkowania


%Czestotliwosc probkowania fpr jest za niska w porownaniu z czestotliwoscia
%sygnalu, przez co 2 rozne czestotliwosci wydaja sie byc takie same
% sinusoida: amplituda, czestotliwosc, faza
%A1 = 0.5;  f1 = 200;      p1=pi/4; 
%A2 = 0.5;  f2 = f1+fpr;   p2=pi/4;
%A3 = 0.5;  f3 = 2*fpr+f1; p3=pi/4;


%Sinusoidy dla wartosci 900, 1900, 2900... są identyczne, czerwona jest
%widoczna bo f1 = 1
A1 = 0.5;  f1 = 5;        p1=pi/4; 
A2 = 0.5;  f2 = fpr - f1; p2=pi/4;
A3 = 0.5;  f3 = 2*fpr-f1; p3=pi/4;


x1 = A1*cos(2*pi*f1 *t+p1); % pierwszy skladnik sygnalu
x2 = A2*cos(2*pi*f2 *t+p2); % drugi skladnik
x3 = A3*cos(2*pi*f3 *t+p3); % trzeci skladnik

% wybor skladowych: 
x = x1 + 0.123*x2 + 0.456*x3;

plot(t,x1,'o- red', t,x2,'o- blue', t,x3, 'o- green'); 
grid; title('Sygnal x(t)'); xlabel('Czas [s]'); ylabel('Amplituda');
pause;
plot(t,x, 'o-')

%Wszystkie 3 brzmią tak samo
sound(x1, fpr)
sound(x2, fpr)
sound(x3, fpr)

figure;
subplot(221);pspectrum(x1, fpr)
subplot(222);pspectrum(x2, fpr)
subplot(223);pspectrum(x3, fpr)
%Wszystkie spectra sygnału są identyczne

