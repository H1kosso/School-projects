% cps_09_fir_okna.m
clear all; close all;

fpr = 8000;      % czestotliwosc probkowania
f0 = 1000;        % czestotliwosc graniczna dla filtrow low-pass oraz high-pass
f1 = 1000;        % czestotliwosc graniczna dolna dla filtrow band-pass oraz band-stop
f2 = 2000;        % czestotliwosc graniczna gorna dla filtrow band-pass oraz band-stop
M = 100;         % polowa dlugosci filtra (N=2M+1)
N = 2*M + 1;     % dlugosc filtra b(n) - u nas zawsze nieparzysta
n = -M :1: M;    % indeksy wag filtra, filtr nieprzyczynowy: b(n) rozne od 0 dla n<0

% Odpowiedzi impulsowe filtrow FIR - ich wagi
hALL = zeros(1,N); hALL(M+1)=1;                          % AllPass
hLP = sin(2*pi*f0/fpr*n)./(pi*n); hLP(M+1) = 2*f0/fpr;   % LowPass f0
hHP = hALL - hLP;                                        % HighPass
hLP1 = sin(2*pi*f1/fpr*n)./(pi*n); hLP1(M+1) = 2*f1/fpr; % LowPass f1
hLP2 = sin(2*pi*f2/fpr*n)./(pi*n); hLP2(M+1) = 2*f2/fpr; % LowPass f2
hBP = hLP2 - hLP1;                                       % BandPass [f1,f2]
hBS = hALL - hBP;                                        % BandStop [f1,f2]
h = hBP;                                                 % wybierz: hLP, hHP, hBP, hBS
hclear = h;
figure;
subplot(311); stem( n, h ); title('b(n)'); grid; 
 %Dla boxcar iloczyn w dziedzinie czasu, odpowiada splotowi w dziedzienie
 %częstotliwośći, przez co zero-jedynkowa odpowiedź częstotliwościowa
 %filtra teoretycznego splata się z oscylacyjnym widem okna prostokątnego i
 %zostaje przez to popsuta
 w1 = boxcar(N).';
 w2 = kaiser(N,10).';
 w3 = chebwin(N,120).';
 w4 = blackman(N).';

 w = w3;
 subplot(312); stem( n, w); title("w(n)"); grid;

 h = h .* w;
 subplot(313); stem( n, h ); title('bw(n)'); grid; 
 b = h;

% Zera i bieguny - położenie

z = roots(b);

alf= 0 : pi/500 : 2*pi; c=cos(alf); s=sin(alf);
figure;
plot(real(z),imag(z),'bo',c,s,'r-'); grid;
axis([-2,2,-2,2]); axis square; title('ZP'); 

% H(f)

f = 0 : 10 : fpr/2;
z = exp(-j*2*pi*f/fpr);
H = polyval(b,z);

figure; % różne okna
subplot(221);plot( f, 20*log10(abs(polyval(hclear.*w1,z))) ); grid; xlabel(' f [Hz]'); ylabel('Gain [dB]');   title('Boxcar |H(f)|');
subplot(222);plot( f, 20*log10(abs(polyval(hclear.*w2,z))) ); grid; xlabel(' f [Hz]'); ylabel('Gain [dB]');   title('Kaiser |H(f)|'); 
subplot(223);plot( f, 20*log10(abs(polyval(hclear.*w3,z))) ); grid; xlabel(' f [Hz]'); ylabel('Gain [dB]');   title('Chebwin |H(f)|');
subplot(224);plot( f, 20*log10(abs(polyval(hclear.*w4,z))) ); grid; xlabel(' f [Hz]'); ylabel('Gain [dB]');   title('Blackman |H(f)|');
figure; % różne parametry Chebwin
subplot(221);plot( f, 20*log10(abs(polyval(hclear.*chebwin(N,60).',z))) ); grid; xlabel(' f [Hz]'); ylabel('Gain [dB]');   title('Chebwin(20) |H(f)|');
subplot(222);plot( f, 20*log10(abs(polyval(hclear.*chebwin(N,80).',z))) ); grid; xlabel(' f [Hz]'); ylabel('Gain [dB]');   title('Chebwin(40) |H(f)|'); 
subplot(223);plot( f, 20*log10(abs(polyval(hclear.*chebwin(N,100).',z))) ); grid; xlabel(' f [Hz]'); ylabel('Gain [dB]');   title('Chebwin(100) |H(f)|');
subplot(224);plot( f, 20*log10(abs(polyval(hclear.*chebwin(N,120).',z))) ); grid; xlabel(' f [Hz]'); ylabel('Gain [dB]');   title('Chebwin(120) |H(f)|');

figure;
subplot(211); plot( f, 20*log10(abs(H)) ); grid; xlabel('f [Hz]'); ylabel('Gain [dB]');   title('|H(f)|');
subplot(212); plot( f, unwrap(angle(H)) ); grid; xlabel('f [Hz]'); ylabel('Phase [rad]'); title('angle(H(f))');

% Sygnal wejsciowy x(n) - suma dwoch sinusoid: 20 oraz 500 Hz
Nx = 2000;                                   % liczba probek sygnalu
dt = 1/fpr; t = dt*(0:Nx-1);                 % chwile pobierania probek (probkowania)
%x = zeros(1,Nx); x(1) = 1;                  % impuls jednostkowy (delta Kroneckera)
x = sin(2*pi*20*t+pi/3) + sin(2*pi*1500*t+pi/7); % suma dwoch sinusow

M = length(b); bx = zeros(1,M);
for n = 1 : Nx
    bx = [ x(n), bx(1:M-1)];
    y(n) = sum( bx .* b); 
end

figure
subplot(211); plot(x,'.-'); title('x(n)');
subplot(212); plot(y,'.-'); title('y(n)');

x = x(Nx/2+1:Nx);
y = y(Nx/2+1:Nx);
Nx = Nx/2;
k = 1:Nx/2+1;
f = fpr/Nx * (0:Nx-1);
X = 2*fft(x)/Nx;
Y = 2*fft(y)/Nx;

figure
subplot(211); plot(f(k),20*log10(abs(X(k))), '.-'); title('|X(f)| [dB]');
subplot(212); plot(f(k),20*log10(abs(Y(k))), '.-'); title('|Y(f)| [dB]');

