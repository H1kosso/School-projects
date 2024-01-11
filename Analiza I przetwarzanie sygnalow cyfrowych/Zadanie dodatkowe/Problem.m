clear all; close all;

[speech, fpr] = audioread("speech8000.wav"); speech = speech';
Nx=length(speech);      % czestotliwosc probkowania, liczba probek
dt = 1/fpr;             % okres probkowania
t = dt*(0:Nx-1);        % chwile pobierania probek

% Sygnał przypominający syrenę
syrena = zeros(1, Nx);
syrena = syrena + sin(2*pi*5*t); 
syrena = syrena + 0.5 * sin(2*pi*(0*t+0.5*30*t.^2));
syrena = syrena + 0.5 * sin(2*pi*(30*t-(9/(2*pi*1)*cos(2*pi*5*t)))); 
syrena = 4*syrena;


ss = syrena + speech;
sound(ss , fpr)


% Wyświetl sygnał
figure; 
subplot(211); plot(t, syrena, '-'); grid; title('Sygnał syreny'); xlabel('czas [s]'); ylabel('Amplituda');
subplot(212); plot(t, speech, '-'); grid; title('Sygnał mowy'); xlabel('czas [s]'); ylabel('Amplituda');

% ----------------------------------------------------------------------------------
% INICJALIZACJA PARAMETROW FILTROW
% Filtr LMS (Least Mean Squares)
M = 50;               % liczba wag filtra
mi = 0.1;             % wspolczynnik szybkosci adaptacji ( 0<mi<1)
% Filtr NLMS (znormalizowany LMS), szybsza zbieznosc
gamma = 0.001;        % aby nie dzielic przez 0, u nas przez 0.001
% Filtr RLS (rekursywny LS) - bardziej zlozony, o wiele szybciej zbiezny
lambd = 0.999;        % RLS - wspolczynnik zapominania w funkcji kosztu LS
Rinv = 0.5*eye(M,M);  % RLS - inicjalizacja odwrotnosci macierzy Rxx


P = 1;                                      % opoznienie w probkach
x = ss;                                     % oryginalny, zaszumiony sygnal mowy
d = [ x(1+P:length(x)) zeros(1,P) ];        % d = sygnal x przyspieszony o P probek
f=0:fpr/500:fpr/2;                          % czestotliwosci dla rysunkow

% Rysunki - sygnaly wejsciowe filtra adaptacyjnego
figure;
subplot(211); plot(t,x); grid; title('WE : sygnal x(n)');
subplot(212); plot(t,d); grid; title('WE : sygnal d(n)'); xlabel('czas (s)'); 

% ----------------------------------------------------------------------------------
% Obliczenie wag optymalnego filtra Wienera
for k = 0 : M
  rxx(k+1) = sum( x(1+k:Nx) .* x(1:Nx-k) )/(Nx-M);  % auto-korelacja sygnalu x(n)
  rdx(k+1) = sum( d(1+k:Nx) .* x(1:Nx-k) )/(Nx-M);  % korelacja wzajemna sygnalow d(n) i x(n)
end
Rxx = toeplitz(rxx,rxx);         % symetryczna macierz autokorelacji sygnalu x(n)
h_opt = Rxx\rdx';                % wagi optymalnego filtra Wienera
lambda = eig( Rxx );             % wartosci wlasne macierzy Rxx
lambda = sort(lambda,'descend'); % sortowanie wartosci wlasnych

figure;
subplot(211); stem( h_opt ); grid; title('Wagi optymalnego filtra Wienera h(n)');
subplot(212); stem( lambda ); grid; title('Wartosci wlasne macierzy Rxx');

% ----------------------------------------------------------------------------------
% FILTRACJA ADAPTACYJNA
bx = zeros(M,1);         % inicjalizacja bufora na probki sygnalu wejsciowego x(n)
h  = zeros(M,1);         % inicjalizacja wag filtra
e = zeros(1,Nx);         % inicjalizacja wyjscia 1
y = zeros(1,Nx);         % inicjalizacja wyjscia 2
for n = 1 : Nx                   % Petla glowna
    bx = [ x(n); bx(1:M-1) ];    % wstawienie nowej probki x(n) do bufora
    y(n) = h' * bx;              % filtracja x(n), czyli estymacja d(n)
    e(n) = d(n) - y(n);          % blad estymacji d(n) przez y(n)
    
    % RLS
    Rinv = (Rinv - Rinv*bx*bx'*Rinv/(lambd+bx'*Rinv*bx))/lambd; % nowe Rinv 
    h = h + (e(n) * Rinv * bx );                                % nowe wagi
end

% ----------------------------------------------------------------------------------
% RYSUNKI - sygnaly wyjsciowe z filtra adaptacyjnego
figure;
subplot(211); plot(t,y); grid; title('WY : sygnal y(n) = destim');
subplot(212); plot(t,e); grid; title('WY : sygnal e(n) = d(n)-y(n)'); xlabel('czas [s]'); 

n=Nx/2+1:Nx; 
SNR_in_dB =  10*log10( sum( ss(n).^2 ) / sum( (d(n)-ss(n)).^2 ) ),
SNR_out_dB = 10*log10( sum( ss(n).^2 ) / sum( (ss(n)-y(n)).^2 ) ),
n=1:Nx-P;

figure; 
subplot(111); plot(1:M+1,h_opt,'ro-',1:M,h,'bx-'); grid; title('h(n): Wiener (RED), nasze (BLUE)');   xlabel('n'); 

pause;
sound(e,fpr);

