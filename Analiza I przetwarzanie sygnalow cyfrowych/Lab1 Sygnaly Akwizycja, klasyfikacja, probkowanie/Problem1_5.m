close all;
clear all;

%24b 48KHz
[xLoud, fprLoud] = audioread('speechLoud.wav');
[xLow, fprLow] = audioread('speechLow.wav');

Nx1 = length(xLoud);    % pobierz liczbe probek
n1= 0:Nx1-1;            % indeksy probek
dt1 = 1/fprLoud;        % oblicz okres probkowania sygnalu
t1 = dt1*n1;            % oblicz chwile probkowania

Nx2 = length(xLow);    % pobierz liczbe probek
n2= 0:Nx2-1;            % indeksy probek
dt2 = 1/fprLow;        % oblicz okres probkowania sygnalu
t2 = dt2*n2;            % oblicz chwile probkowania

figure;
subplot(221);plot(t1,xLoud,'b-')
subplot(222);plot(t2,xLow,'b-')