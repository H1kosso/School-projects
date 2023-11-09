clear all;
close all;

[x1, fpr1] = audioread('szczebrzeszyn8KHz8b.wav');
clear audio;
[x2, fpr2] = audioread('szczebrzeszyn48Khz24b.wav');
clear audio;
Nx1 = length(x1);       % pobierz liczbe probek
n1= 0:Nx1-1;            % indeksy probek
dt1 = 1/fpr1;           % oblicz okres probkowania sygnalu
t1 = dt1*n1;            % oblicz chwile probkowania

Nx2 = length(x2);       % pobierz liczbe probek
n2= 0:Nx2-1;            % indeksy probek
dt2 = 1/fpr2;           % oblicz okres probkowania sygnalu
t2 = dt2*n2;            % oblicz chwile probkowania

figure;
subplot(221);plot(t1,x1,'b-')
subplot(222);plot(t2,x2,'b-')
sound(x1, fpr1)
pause(3);
sound(x2, fpr2)