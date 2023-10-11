clear all; close all;

fpr=1000; Nx=1000; % parametry: czestotliwosc probkowania, liczba probek
dt = 1/fpr; % okres probkowania
n = 0 : Nx-1; % numery probek
t = dt*n; % chwile probkowania

% sinusoida: amplituda, czestotliwosc, faza
A1 = 0.5 ; f1 = 2; p1=pi/2; 
A2 = 0.2; f2 = 5; p2=pi/10;
A3 = 0.56; f3 = 8; p3=pi/6;

%szum
s1 = rand(1,Nx);  % s1 = 0.1*(2*(s1-0.5)); % rownomierny, skalowanie do [-0.1,0.1]
s2 = randn(1,Nx); % s2 = 0.1*s2; % gaussowski, skalowanie do std=0.1
figure; 
subplot(221); plot(s1,'.-'); grid; title('Szum rownomierny [0,1]');
subplot(222); plot(s2,'.-'); grid; title('Szum gaussowski');
subplot(223); histogram(s1,20); title('Histogram szumu rownomiernego');
subplot(224); histogram(s2,20); title('Histogram szumu gaussowskiego');

x1 = A1*sin(2*pi*f1 *t+p1); % pierwszy skladnik sygnalu
x2 = A2*sin(2*pi*f2 *t+p2); % drugi skladnik
x3 = A3*sin(2*pi*f3 *t+p3); % trzeci skladnik

figure; % wykresy sinusoid
%normalna
subplot(221);plot(t,x1,'o- red', t,x2,'o- blue', t,x3, 'o- green'); 
grid; title('Sygnal x(t)'); xlabel('Czas [s]'); ylabel('Amplituda');
%zaszumiona
subplot(222);plot(t,x1 +s1,'o- red', t,x2 +s2,'o- blue', t,x3 +s1 + s2, 'o- green'); 
grid; title('Sygnal x(t)'); xlabel('Czas [s]'); ylabel('Amplituda');

%sygnał czysty
x = x1 + 0.123*x2 + 0.456*x3;
subplot(223);plot(t,x, 'o-')
grid; title('Sygnal x(t)'); xlabel('Czas [s]'); ylabel('Amplituda');

%sygnał zaszumiony
xs = x1 +s1 + 0.123*x2 +s2 + 0.456*x3 +s1 + s2;
subplot(224);plot(t,xs, 'o-')
grid; title('Sygnal x(t)'); xlabel('Czas [s]'); ylabel('Amplituda');
