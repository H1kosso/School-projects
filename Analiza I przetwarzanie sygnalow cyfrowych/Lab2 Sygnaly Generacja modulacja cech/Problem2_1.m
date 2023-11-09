clear all; close all;
fpr=100; Nx=1000; % czestotliwosc probkowania, liczba probek
dt = 1/fpr; % okres probkowania
t = dt*(0:Nx-1); % chwile pobierania probek
x1=sin(2*pi*10*t); % sinus 10 Hz
x2=sin(2*pi*1*t); % sinus 1 Hz
x3=exp(-5*t); % eksponenta opadajaca w czasie
x4=exp(-25*(t-0.5).^2); % gaussoida
x5=sin(2*pi*(0*t+0.5*20*t.^2)); % liniowy przyrost czest. (LFM): od 0 Hz, +20Hz/s
x6=sin(2*pi*(10*t-(9/(2*pi*1)*cos(2*pi*1*t)))); % sinus. FM: 9Hz wokol 10Hz 1x na sec
x7=sin(2*pi*(10*t+9*cumsum(x2)*dt)); % to samo co x6; dlaczego?
x = x1; % wybor: x1,x2,...,x7, 0.23*x1 + x2, x1.*x3, ...
figure;
subplot(221);plot(t,x1,'o-'); grid; title('Sygnal x1(t)'); xlabel('czas [s]'); ylabel('Amplituda')
subplot(222);plot(t,x2,'o-'); grid; title('Sygnal x2(t)'); xlabel('czas [s]'); ylabel('Amplituda')
subplot(223);plot(t,x3,'o-'); grid; title('Sygnal x3(t)'); xlabel('czas [s]'); ylabel('Amplituda')
subplot(224);plot(t,x4,'o-'); grid; title('Sygnal x4(t)'); xlabel('czas [s]'); ylabel('Amplituda')
figure;
subplot(221);plot(t,x5,'o-'); grid; title('Sygnal x5(t)'); xlabel('czas [s]'); ylabel('Amplituda')
subplot(222);plot(t,x6,'o-'); grid; title('Sygnal x6(t)'); xlabel('czas [s]'); ylabel('Amplituda')
subplot(223);plot(t,x7,'o-'); grid; title('Sygnal x7(t)'); xlabel('czas [s]'); ylabel('Amplituda')

figure;
x=(1+0.5*x2).*x1;
subplot(221);plot(t,x,'o-'); grid; title('Sygnal x=(1+0.5*x2).*x1'); xlabel('czas [s]'); ylabel('Amplituda')
x=0.5*x1 + 0.5*x2 + 0.5*x3;
subplot(222);plot(t,x,'o-'); grid; title('Sygnal x=0.5*x1 + 0.5*x2 + 0.5*x3'); xlabel('czas [s]'); ylabel('Amplituda')
x=(1+0.5*x2).*x6;
subplot(223);plot(t,x,'o-'); grid; title('Sygnal  x=(1+0.5*x2).*x6'); xlabel('czas [s]'); ylabel('Amplituda')
x=(1+0.5*x2).*x5;
subplot(224);plot(t,x1,'o-'); grid; title('Sygnal x=(1+0.5*x2).*x5'); xlabel('czas [s]'); ylabel('Amplituda')

