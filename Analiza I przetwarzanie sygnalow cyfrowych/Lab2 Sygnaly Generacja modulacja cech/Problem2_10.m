clear all;
close all;

N = 10000;
x1 = sin(2*pi/1000*(0:N-1)); % sinusoida
x2 = rand(1,N); %równomierny szumy w przedziale [0,1]
x3 = randn(1,N); % szum gausowski
fs = 1000; % Częstotliwość próbkowania
dt = 1 / fs; % Krok czasowy
 
figure;
r = xcorr(x1);
subplot(221);plot(r);title('Sinusoida');
disp('Sinusoida');
srednia = mean(x1)
wariancja = var(x1)
odchStd = std(x1)
energia = dt*sum(x1.^2)
moc = sum(x1.^2)/length(x1)
RMS = sqrt(sum(x1.^2)/length(x1))
Pn = mean(x1)
SNR = 10*log10(moc/Pn)

r = xcorr(x2); 
subplot(222);plot(r);title('Szum równomierny');
disp('Szum równomierny');
srednia = mean(x2)
wariancja = var(x2)
odchStd = std(x2)
energia = dt*sum(x2.^2)
moc = sum(x2.^2)/length(x2)
RMS = sqrt(sum(x2.^2)/length(x2))
Pn = mean(x2)
SNR = 10*log10(moc/Pn)

r = xcorr(x3); 
subplot(223);plot(r);title('Szum Gaussowski');
disp('Szum Gaussowski');
srednia = mean(x2)
wariancja = var(x2)
odchStd = std(x2)
energia = dt*sum(x2.^2)
moc = sum(x2.^2)/length(x2)
RMS = sqrt(sum(x2.^2)/length(x2))
Pn = mean(x2)
SNR = 10*log10(moc/Pn)

r = xcorr(x1,x3);
subplot(224);plot(r);title('x=x1+x3');
