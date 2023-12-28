
% Filtry cyfrowe FIR

clear all; close all;

fpr = 8000;

% Projekt wag bk
  
  f0 = 1000;
  f1 = 1000;
  f2 = 2000;


  figure;

  M = 100; N = 2*M+1;
  n = -M : 1:  M;

  h_ALL = zeros(1,N); h_ALL(M+1)=1;

  h_LP = sin(2*pi*f0/fpr*n) ./ (pi*n); h_LP(M+1) = 2*f0/fpr;
  h_HP = h_ALL - h_LP;
  h_BP = sin(2*pi*f2/fpr*n) ./ (pi*n) - sin(2*pi*f1/fpr*n) ./ (pi*n); h_BP(M+1) = 2*f2/fpr - 2*f1/fpr;
  h_BS = h_ALL - h_BP;
  h = h_BS;
  subplot(311); stem(n,h); title('h(n)');
  
  w1 = boxcar(N).';
  w2 = kaiser(N,10).';
  w3 = chebwin(N,120).';
  w = w3;
  subplot(312); stem(n,w); title('w(n)');

  h = h .* w;
  subplot(313); stem(n,h); title('hw(n)'); pause

  b = h;

% Zera i bieguny - położenie

z = roots(b);

alf= 0 : pi/500 : 2*pi; c=cos(alf); s=sin(alf);
figure;
plot(real(z),imag(z),'bo',c,s,'r-'); grid;
axis([-2,2,-2,2]); axis square; title('ZP'); pause

% H(f)

f = 0 : 10 : fpr/2;
z = exp(-j*2*pi*f/fpr);
H = polyval(b,z);

figure;
subplot(211); plot( f, 20*log10(abs(H)) ); grid; xlabel('f [Hz]'); ylabel('Gain [dB]');   title('|H(f)|');
subplot(212); plot( f, unwrap(angle(H)) ); grid; xlabel('f [Hz]'); ylabel('Phase [rad]'); title('angle(H(f))');
pause

% Test

if(1)
   Nx = 2^12;
   dt = 1/fpr; t = dt*(0:Nx-1);
   x = 2.5*sin(2*pi*10*t) + sin(2*pi*1500*t);
else
   [x,fpr] = audioread('speech8000.wav');
   Nx = length(x);
end

b = b(end:-1:1),
%a = a(end:-1:1),
%pause

M = length(b); bx = zeros(1,M);
for n = 1 : Nx
    bx = [ x(n), bx(1:M-1)];
    y(n) = sum( bx .* b); 
end

figure
subplot(211); plot(x,'.-'); title('x(n)');
subplot(212); plot(y,'.-'); title('y(n)');
pause

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
pause



