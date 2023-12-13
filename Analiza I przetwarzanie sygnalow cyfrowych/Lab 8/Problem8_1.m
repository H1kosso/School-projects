% cps_08_matlab.m
clear all; close all;
fpr=2000; f1=10; f2=600; N=8; Rp=3; Rs=80;         % 1) wymagania dla filtra

%     [b, a ] = cheby2( N, 100, [ 1000, 2000 ]/(fpr/2), "stop" );
%     [b, a ] = cheby1( N, 3, [ 1000, 2000 ]/(fpr/2), "stop" );
%     [b, a ] = butter( N, [ 1000, 2000 ]/(fpr/2), "stop" );

[bl,al] = ellip(N, Rp, Rs, f2/(fpr/2), 'low');  % 2) projekt filtra
[bh,ah] = ellip(N, Rp, Rs, f2/(fpr/2), 'high');  % 2) projekt filtra
[bb,ab] = ellip(N, Rp, Rs, [f1,f2]/(fpr/2), 'bandpass');  % 2) projekt filtra
[bs,as] = ellip(N, Rp, Rs, [f1,f2]/(fpr/2), 'stop');  % 2) projekt filtra

Npunkt=1000;  

freqz(bl,al,Npunkt,fpr);  pause;      %low         % 3) sprawdzenie H(f) filtra
freqz(bh,ah,Npunkt,fpr);  pause;      %high
freqz(bb,ab,Npunkt,fpr);  pause;      %bandpass
freqz(bs,as,Npunkt,fpr);  pause;      %stop

Nx=1000; dt=1/fpr; t=dt*(0:Nx-1); fx1=10; fx2=500;  % 4) wymagania dla sygnalu
x = sin(2*pi*fx1*t) + sin(2*pi*fx2*t);              % 5) generacja sygnalu  
yl = filter(bl,al,x);                                  % 6) filtracja sygnału - dwie sumy
yh = filter(bh,ah,x);      
yb = filter(bb,ab,x);      
ys = filter(bs,as,x);       

figure; 
subplot(411); plot(t,x,'b-',t,yl,'r-'); title('We/Wy low');    % 7) wynik filtracji
subplot(412); plot(t,x,'b-',t,yh,'r-'); title('We/Wy high');
subplot(413); plot(t,x,'b-',t,yb,'r-'); title('We/Wy bandpass');
subplot(414); plot(t,x,'b-',t,ys,'r-'); title('We/Wy stop');
