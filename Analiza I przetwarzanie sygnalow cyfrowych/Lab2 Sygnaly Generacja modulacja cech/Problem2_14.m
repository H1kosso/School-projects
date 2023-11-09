clear all;
close all;

[audio_1,fpr_1] = audioread('early.wav'); 
[audio_2,fpr_2] = audioread('late.wav'); 

sound(audio_1,fpr_1);
pause();
sound(audio_2,fpr_2);

r = xcorr(audio_1, audio_2);
[~, time] = max(r);
plot(r); xlabel("Czas [s]"); ylabel("Korelacja")
