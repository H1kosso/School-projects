clear all; close all;
fpr=1000; Nx=10*fpr; % czestotliwosc probkowania, liczba probek
df = 200;
dt = 1/fpr; % okres probkowania
t = dt*(0:Nx-1); % chwile pobierania probek

x=cos(2*pi*(0*t+0.5*df*t.^2));

figure;
subplot(221);plot(t,x,'o-'); grid; title('fpr=1000 Nx=10*fpr df=200'); xlabel('czas [s]'); ylabel('Amplituda');
fpr=8000;
Nx=10*fpr;
df=2000;
subplot(222);plot(t,x,'o-'); grid; title('fpr=1000 Nx=10*fpr df=200'); xlabel('czas [s]'); ylabel('Amplituda');
sound (x,fpr);
spectrogram(x,256,256-64,512,fpr);
