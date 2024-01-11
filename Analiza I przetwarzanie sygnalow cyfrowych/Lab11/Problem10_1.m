clear all;
close all;
 
Nx=1000; 
fs=2000; 
f0=fs/40; 
x=cos(2*pi*(f0/fs)*(0:Nx-1));

xa1=hilbert(x);

X=fft(x);
n=1:Nx/2; X(n)=-j*X(n);      % dodatnie czestotliwosci
X(1)=0; X(Nx/2+1)=0;
n=Nx/2+2:Nx; X(n)= j*X(n);   % ujemne czestotliwosci
xH=real(ifft(X));

xa2=x+j*xH; % sygnal analityczny

figure;
plot(x,xH,'bo-');
figure; 
for n=1:100, 
plot(x(n),xH(n),'bo'); 
hold on; pause(0.05); 
end

figure;
subplot(211); plot(xa1); title('Sygnał xa1');
subplot(212); plot(xa2); title('Sygnał xa2');

X_fft = fft(x);
Xa_fft = fft(xa2);

figure;
subplot(2, 1, 1); plot(abs(X_fft)); title('Widmo FFT sygnału rzeczywistego');
subplot(2, 1, 2); plot(abs(Xa_fft)); title('Widmo FFT sygnału analitycznego');

% Wczytaj sygnał mowy (przykładowy kod, dostosuj ścieżkę do pliku audio)
[speech, fs_speech] = audioread('speech8000.wav');

% Oblicz widmo FFT sygnału mowy
X_speech_fft = fft(speech);

% Porównaj widma
figure;
subplot(2, 1, 1); plot(abs(X_fft)); title('Widmo FFT sygnału rzeczywistego');
subplot(2, 1, 2); plot(abs(X_speech_fft)); title('Widmo FFT sygnału mowy');

xs = hilbert(speech);
figure;
subplot(211); plot(xa2); title('Sygnał xa1');
subplot(212); plot(xa2); title('Sygnał xs');