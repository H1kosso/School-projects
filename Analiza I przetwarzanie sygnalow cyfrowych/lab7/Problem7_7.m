% cps_07_analog_tranform.m
clear all; close all;

% Wymagania
N = 8;              % liczba biegunow transmitanci prototypu analogowego
N2 = 16
f0 = 100;           % dla filtrow LowPass  oraz HighPass
f1 = 10; f2=100;    % dla filtrow BandPass oraz BandStop
Rp = 3;             % dozwolony poziom oscylacji w pasmie przepustowym (w dB) - ripples in pass
Rs = 100;           % dozwolony poziom oscylacji w pasmie zaporowym (w dB) - ripples in stop
     
% Projekt analogowego filtra prototypowego - dolnoprzepustowy z w0 = 1 
% [z,p,wzm] = buttap(N);          % analogowy prototyp Butterwotha
  [z,p,wzm] = cheb1ap(N,Rp);      % analogowy prototyp Czebyszewa typu-I
  [z2,p2,wzm2] = cheb1ap(N2,Rp);
% [z,p,wzm] = cheb2ap(N,Rs);      % analogowy prototyp Czebyszewa typu-II
% [z,p,wzm] = ellipap(N,Rp,Rs);   % analogowy prototyp Cauera (eliptyczny)
b = wzm*poly(z); b2 = wzm2*poly(z2);                 % [z,wzm] --> b      
a = poly(p);     a2 = poly(p2);                 % p --> a
%kolo
f = 0 : 0.01 : 1000; w = 2*pi*f;  % zakres częstotliwosci
H = freqs(b,a,w);  H2= freqs(b2,a2,w);               % odpowiedz czestotliwosciowa filtra (funkcja Matlaba)  
fi=0:pi/1000:2*pi; c=cos(fi); s=sin(fi);

figure; % 1
subplot(221);semilogx(w,20*log10(abs(H))); grid; xlabel('w [rad*Hz]'); title('Analog Proto |H(f)| N=8');  
subplot(223);plot(real(z),imag(z),'ro',real(p),imag(p),'b*',c,s,'k-'); grid; title('Analog Proto ZP N=8');  
%2
subplot(222);semilogx(w,20*log10(abs(H2))); grid; xlabel('w [rad*Hz]'); title('Analog Proto |H(f)| N=16');  
subplot(224);plot(real(z2),imag(z2),'ro',real(p2),imag(p2),'b*',c,s,'k-'); grid; title('Analog Proto ZP N=16'); 
      
% Transformacja czestotliwosci: znormalizowany (w0=1) LowPass --> xxxPass, xxxStop
% Funkcje xx2yy z Signal Processing Toolbox
%  [b,a] = lp2lp(b,a,2*pi*f0);                         % LowPass na LowPass
% [b,a] = lp2hp(b,a,2*pi*f0);                         % LowPass na HighPass
 [b,a] = lp2bp(b,a,2*pi*sqrt(f1*f2),2*pi*(f2-f1));   % LowPass na BandPass
 [b2,a2] = lp2bp(b2,a2,2*pi*sqrt(f1*f2),2*pi*(f2-f1));
% [b,a] = lp2bs(b,a,2*pi*sqrt(f1*f2),2*pi*(f2-f1));   % LowPass na BandStop

z=roots(b); p=roots(a);
z2=roots(b2); p2=roots(a2);

% ... kontynuuj cps_07_analog_intro.m

% Weryfikacja odpowiedzi (charakterystyki) filtra: amplitudowej fazowej, impulsowej, skokowej
f = 0 : 0.1 : 1000;                % czestotliwosc w hercach
w = 2*pi*f;                        % czestotliwosc katowa, pulsacja
s = j*w;                           % zmienna transformacji Laplace'a
H = polyval(b,s) ./ polyval(a,s);  % h(s) --> H(f) dla s=j*w: iloraz dwoch wielomianow
H2 = polyval(b2,s) ./ polyval(a2,s);
figure;%1
subplot(221);plot(f,20*log10(abs(H))); xlabel('f [Hz]'); title('|H(f)| [dB] N=8'); grid; 
subplot(223);plot(f,unwrap(angle(H))); xlabel('f [Hz]'); title('angle(H(f)) [rad] N=8'); grid; 
%2
subplot(222);plot(f,20*log10(abs(H2))); xlabel('f [Hz]'); title('|H(f)| [dB] N=16'); grid; 
subplot(224);plot(f,unwrap(angle(H2))); xlabel('f [Hz]'); title('angle(H(f)) [rad] N=16'); grid; 

figure; 
subplot(221);impulse(b,a);         % odpowiedz filtra na pobudzenie impulsowe (z Control Toolbox)
subplot(223);step(b,a);            % odpowiedz filtra na pobudzenie skokowe (z Control Toolbox)

subplot(222);impulse(b2,a2);         % odpowiedz filtra na pobudzenie impulsowe (z Control Toolbox)
subplot(224);step(b2,a2);            % odpowiedz filtra na pobudzenie skokowe (z Control Toolbox)
