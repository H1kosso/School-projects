close all;
clear all;

N = 2000;
fpr = 2000;
dt = 1/fpr;
t = dt * (0:N-1);

T=N*dt; f0=1/T; fk = f0*(0:N-1); %skalowanie

%sinusoida
x=sin(2*pi*50*t);
%okno kaisera
y=kaiser(N,15);
X = fft(x);
Y = fft(y);

figure;
subplot(321); plot(t, x); title('Sinusoida o czestotliwosci 50HZ')
subplot(323); plot(fk,real(X),'o-'); title('real(X(f))'); grid;
subplot(325); plot(fk,imag(X),'o-'); title('imag(X(f))'); grid;

subplot(322); plot(t,y); title('Okno Kaisera'); grid;
subplot(324); plot(fk,real(Y),'o-'); title('real(Y(f))'); grid;
subplot(326); plot(fk,imag(Y),'o-'); title('imag(Y(f))'); grid;


z = conv(x,y); %splot
Rxy = xcorr(x,y); % korelacja

Z = fft(z);
RXY = fft(Rxy);

figure;
subplot(321); plot( z); title('Splot x, y');grid;
subplot(323); plot( real(Z),'o-'); title('real(Z(f))'); grid;
subplot(325); plot( imag(Z),'o-'); title('imag(Z(f))'); grid;

subplot(322); plot(Rxy); title('Korelacja x, y'); grid;
subplot(324); plot( real(RXY),'o-'); title('real(RXY(f))'); grid;
subplot(326); plot( imag(RXY),'o-'); title('imag(RXY(f))'); grid;

diffX = diff(x)./diff(t);
diffY = diff(y)./diff(t);

DIFFX = fft(diffX);
DIFFY = fft(diffY);

figure;
subplot(321); plot(diffX); title('Pochodna x');grid;
subplot(323); plot( real(DIFFX),'o-'); title('real(DIFFX(f))'); grid;
subplot(325); plot( imag(DIFFX),'o-'); title('imag(DIFFX(f))'); grid;

subplot(322); plot(diffY); title('Pochodna y'); grid;
subplot(324); plot( real(DIFFY),'o-'); title('real(DIFFY(f))'); grid;
subplot(326); plot( imag(DIFFY),'o-'); title('imag(DIFFY(f))'); grid;


