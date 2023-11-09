clear all;
close all;

N = 25;
A = zeros(N, N);

for k = 0:N-1
    A(k+1, 1:N) = sqrt(2/N) * cos(pi/N * (k+1/2) * ((0:N-1) + 1/2));
end

% Wykresy kolejnych wierszy macierzy A
figure;
for k = 1:N
    subplot(5, 5, k);
    plot(A(k, :));
    title(['Wiersz ' num2str(k)]);
end

% Sprawdzenie ortogonalności
rows = [1 20 2 19 3 15 4 8 5 16];
for i = 1:5
    row1 = A(rows(2*i - 1), :);
    row2 = A(rows(2*i), :);
    iloczyn = sum(row1 .* row2); % Iloczyn skalarny
    disp(['Iloczyn skalarny między wierszem ' num2str(rows(2*i - 1)) ' i ' num2str(rows(2*i)) ' wynosi: ' num2str(round(iloczyn*10^10)/10^10)]);
end

% Odwrotność macierzy
inv_A = inv(A);

% Moze to wynikać z z ograniczeń liczb zmienoprzecinkowych na komputerze,
% Porównanie macierzy odwrotnej z macierzą sprzężoną transponowaną
if isequal(inv_A, A')
    disp('inv(A) = A''. Macierz A jest ortogonalna.');
else
    disp('inv(A) =/= A''. Macierz A nie jest ortogonalna.');
end

% Porównaj wyniki operacji inv(A)*A i A'*A
result1 = inv_A * A;
result1 = round(result1 *10^10)/10^10;
result2 = A' * A;
result2 = round(result2 *10^10)/10^10;

%czyli mają na przekątnej same 1
if isequal(result1, eye(N)) && isequal(result2, eye(N))
    disp('Macierze wynikowe inv(A)*A i A''*A są macierzami jednostkowymi.');
else
    disp('Macierze wynikowe inv(A)*A i A''*A nie są macierzami jednostkowymi.');
end
