close all;
clear all;

N = 2000;
fpr = 2000;
dt = 1/fpr;
t = dt * (0:N-1);



%sygnał okna prostokątnego
okno = boxcar(N)';
oknoFFT = fft(okno);

%sygnał znaku
znak = sign(t);
znakFFt = fft(znak);

%sygnał gaussa
gauss = exp(-t.^2);
gaussFFT = fft(gauss);

%jednostronna eksponenta
exponenta = exp(-10 * t);
exponentaFFT = fft(exponenta);

%tlumiony sinus
sinus  = exp(-2 * t) .* sin(2 * pi * 10 * t);
sinusFFT = fft(sinus);


%tlumiony cosinus
cosinus = exp(-5 * t) .* cos(2 * pi * 5 * t);
cosinusFFT = fft(cosinus);

figure;
subplot(331);plot(t,okno);title("Okno prostokątne");
subplot(332);plot(t, abs(oknoFFT));title('Widmo DFT - skala liniowa')
subplot(333);plot(t, 20*log10( abs(oknoFFT)));title('Widmo DFT - decybelowa')


subplot(334);plot(t,znak);title("Sygnał znaku");
subplot(335);plot(abs(znakFFt));title('Widmo DFT')
subplot(336);plot(t, 20*log10( abs(znakFFt)));title('Widmo DFT - decybelowa')


subplot(337);plot(t,gauss);title("Funkcja Gaussa");
subplot(338);plot(abs(gaussFFT));title('Widmo DFT - skala liniowa')
subplot(339);plot(t, 20*log10( abs(gaussFFT)));title('Widmo DFT - decybelowa')


figure;
subplot(331);plot(t,exponenta);title("Jednostronna exponenta");
subplot(332);plot(abs(exponentaFFT));title('Widmo DFT - skala liniowa')
subplot(333);plot(t, 20*log10( abs(exponentaFFT)));title('Widmo DFT - decybelowa')


subplot(334);plot(t,sinus);title("Tlumiony sinus");
subplot(335);plot(abs(sinusFFT));title('Widmo DFT - skala liniowa')
subplot(336);plot(t, 20*log10( abs(sinusFFT)));title('Widmo DFT - decybelowa')


subplot(337);plot(t,cosinus);title("Tlumiony cosinus");
subplot(338);plot(abs(cosinusFFT));title('Widmo DFT - skala liniowa')
subplot(339);plot(t, 20*log10( abs(cosinusFFT)));title('Widmo DFT - decybelowa')

