clear all;
close all;

[h, fpr] = audioread('impulse_LargeConcertHall.wav');
[m, fpr2] = audioread('speech44100.wav');

%Uzupelnienie zerami
N = length(h) + length(m) - 1;
hz = [h; zeros(N - length(h), size(h, 2))]; 
mz = [m; zeros(N - length(m), size(m, 2))]; 

%splot
H = fft(hz);
M = fft(mz);
Y = ifft(H .* M);

% Step 4: Play original and convolved signals
%sound(m, fpr); 
%pause(length(m) / fpr);
sound(Y, fpr); 
