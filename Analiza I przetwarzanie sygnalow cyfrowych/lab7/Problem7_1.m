% cps_07_analog_intro.m
clear all; close all;

% Zaprojektuj/dobierz wspolczynniki transmitancji filtra analogowego
if(0)  % dobor wartosci wspolczynnikow wielomianow zmiennej 's' transmitancji
   b = [3,2];                      % [ b1, b0 ]
   a = [4,3,2,1];                  % [ a3, a2, a1, a0=1]
   z = roots(b); p = roots(a);     % [b,a] --> [z,p]
else   % dobor wartosci pierwiastkow wielomianow zmiennej 's' transmitancji
   wzm = 0.001;
   z = j*2*pi*[ 300 ];         z = [z conj(z)];  %zero transmitancji - tlumienie
   p = [-1] + j*2*pi*[ 400 ]; p = [p conj(p)]; % biegun - wzmacnanie
   b = wzm*poly(z);  a = poly(p); % [z,p] --> [b,a]
end
figure; plot(real(z),imag(z),'bo', real(p),imag(p),'r*'); grid;
title('Zera (o) i Bieguny (*)'); xlabel('Real()'); ylabel('Imag()'); 

% Weryfikacja odpowiedzi (charakterystyki) filtra: amplitudowej fazowej, impulsowej, skokowej
f = 0 : 0.1 : 1000;                % czestotliwosc w hercach
w = 2*pi*f;                        % czestotliwosc katowa, pulsacja
s = j*w;                           % zmienna transformacji Laplace'a
H = polyval(b,s) ./ polyval(a,s);  % h(s) --> H(f) dla s=j*w: iloraz dwoch wielomianow
figure;
subplot(211); plot(f,20*log10(abs(H))); xlabel('f [Hz]'); title('|H(f)| [dB]'); grid; 
subplot(212); plot(f,unwrap(angle(H))); xlabel('f [Hz]'); title('angle(H(f)) [rad]'); grid; 
figure;
subplot(211);impulse(b,a);         % odpowiedz filtra na pobudzenie impulsowe (z Control Toolbox)
subplot(212); step(b,a);            % odpowiedz filtra na pobudzenie skokowe (z Control Toolbox)

% Zapamietaj: zero transmitancji słu ´ zy do usuwania wybranych cz˛estotliwo ˙ sci ´
% (powoduje "dołek"/"szczelin˛e" w ch-ce amplitudowej filtra), natomiast biegun transmitancji - słuzy do wzmacniania ˙
% wybranych cz˛estotliwosci (powoduje "górk˛e"/"garb")