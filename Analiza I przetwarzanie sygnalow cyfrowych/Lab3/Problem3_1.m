clear all;
close all;


x = [1/2, -1/2, 1/2, -1/2];
y = [1/2, 1/2, -1/2, -1/2];
z = [-1/2, -1/2, -1/2, -1/2];
w = [-1/2, 1/2, 1/2, -1/2];

% Macierz
A = [x; y; z; w]

% Macierz odwrotna
inv_A = inv(A)

% Macierz transponowana
A_t = A'

if isequal(inv_A, A_t)
    disp('inv(A) = A''. Macierz A jest ortogonalna.');
else
    disp('inv(A) =/=  A''. Macierz A nie jest ortogonalna.');
end
