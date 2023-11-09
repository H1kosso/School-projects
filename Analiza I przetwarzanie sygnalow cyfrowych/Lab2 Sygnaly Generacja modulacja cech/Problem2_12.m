clear all;
close all;


[x, fpr] = audioread('aaa.wav');
N = length(x);
lags = -(N-1):(N-1); % zakres opoznien miedzy sygnalem a jego kopia

Rxx_biased = xcorr(x, x, 'biased');
Rxx_unbiased = xcorr(x, x, 'unbiased');
Rxx_coeff = xcorr(x, x, 'coeff');
Rxx_none = xcorr(x, x, 'none');

figure;
subplot(2, 2, 1);
plot(lags, Rxx_biased);
title('Biased');xlabel('Opoznienie miedzy sygnałami');

subplot(2, 2, 2);
plot(lags, Rxx_unbiased);
title('Unbiased');xlabel('Opoznienie miedzy sygnałami');

subplot(2, 2, 3);
plot(lags, Rxx_coeff);
title('Coeff');xlabel('Opoznienie miedzy sygnałami');

subplot(2, 2, 4);
plot(lags, Rxx_none);
title('None');xlabel('Opoznienie miedzy sygnałami');
%max value / max index
[mvb, mib] = max(Rxx_biased);
[mvu, miu] = max(Rxx_unbiased);
[mvc, mic] = max(Rxx_coeff);
[mvn, min] = max(Rxx_none);

period_biased = abs(lags(mib));
period_unbiased = abs(lags(miu));
period_coeff = abs(lags(mic));
period_none = abs(lags(min));
disp(['Biased okres: ' num2str(period_biased)]);
disp(['Unbiased okres: ' num2str(period_unbiased)]);
disp(['Coeff okres: ' num2str(period_coeff)]);
disp(['None okres: ' num2str(period_none)]);
