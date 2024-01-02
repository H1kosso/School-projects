clear all;
close all;

[x,fs]=audioread('speech8000.wav'); x=x(:,1)'; 
[m, fsm] = audioread('piano.wav'); m=m(:,1)'; 
%soundsc(x,8000);

UP = 6;
DOWN = 1;

xup = resample(x, UP, DOWN);
%pause;
%soundsc(xup,48000);

figure;
subplot(311);plot(x); title('x');
subplot(312);plot(xup); title('xup');
subplot(313);plot(m); title('m');


if length(x) > length(m)
    m = [m, zeros(1, length(x) - length(m))];
else
    x = [x, zeros(1, length(m) - length(x))];
end
xm = x + m;
if length(xup) > length(m)
    m = [m, zeros(1, length(xup) - length(m))];
else
    xup = [xup, zeros(1, length(m) - length(xup))];
end
xupm = xup + m;


pause;
soundsc(xm, 48000);
pause;
soundsc(xupm, 48000);