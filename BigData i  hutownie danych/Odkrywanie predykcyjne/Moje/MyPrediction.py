from data.mining.predictive import *
from data.datasources import *
import pandas as pd
import numpy as np
import warnings
import os

"""Zapytanie do analizy sprzedaży wg lat"""

analysis_sale_by_week_query = "SELECT a.wojewodztwo, EXTRACT(WEEK FROM z.czas_nadania)::integer, " \
                              "COUNT(*)::integer AS liczba_uslug " \
                              "FROM poczta_oltp.zakup z " \
                              "INNER JOIN poczta_oltp.klient k ON z.id_nadawcy = k.id_klienta " \
                              "INNER JOIN poczta_oltp.adres a ON k.id_adresu = a.id_adresu " \
                              "INNER JOIN poczta_oltp.usluga u USING(id_uslugi) " \
                              "GROUP BY 1, 2 " \
                              "ORDER BY 1, 2 ASC "


def make_experiment_prediction(query):
    """Eksperyment predykcji"""
    warnings.filterwarnings("ignore")

    rs = connect(query)

    # Utworzenie ramki danych

    df = pd.DataFrame(rs, columns=["Wojewodztwo", "tydzien", "liczba"])
    print(df, os.linesep)

    x_feature = "tydzien"
    y_feature = "liczba"
    xlabel = "Tydzien"
    ylabel = "Liczba usług"
    title = "Liczba usług w tygodniu"

    # Wykres punktowy kompletnego zbioru pobranych danych
    visualize_plot_scatter(x_plot=None, y_plot=None, x_scatter=df.loc[:, x_feature], y_scatter=df.loc[:, y_feature],
                           title=title, xlabel=xlabel, ylabel=ylabel)

    # Utworzenie i wyświetlenie początkowych danych ZBIÓR UCZĄCEGO
    df_train = df[df.tydzien <= 26]
    print(df_train.head, os.linesep)

    # Utworzenie i wyświetlenie początkowych danych ZBIÓR TESTOWEGO
    df_test = df[df.tydzien > 26]
    print(df_test.head, os.linesep)

    # Wykres punktowy z oznaczeniem lat ZBIÓR UCZĄCY
    visualize(df=df_train, x=x_feature, y=y_feature, title=title + "\n{Zbiór UCZĄCY}", grouping="tydzien")

    # Wykres punktowy z oznaczeniem lat ZBIÓR TESTOWY
    visualize(df=df_test, x=x_feature, y=y_feature, title=title + "\n{Zbiór TESTOWY}", grouping="tydzien")

    # Wykres punktowy ZBIÓR UCZĄCY
    visualize(df=df_train, x=x_feature, y=y_feature, title=title + "\n{Zbiór UCZĄCY}", regression=False)

    # Wykres punktowy z regresją liniową ZBIÓR UCZĄCY
    visualize(df=df_train, x=x_feature, y=y_feature, title=title + " & " + "Regresja" + "\n{Zbiór UCZĄCY}",
              regression=True)

    # Współczynnik korelacji liniowej Pearsona
    pc = np.corrcoef(df_train[x_feature], df_train[y_feature])
    print("Współczynnik korelacji liniowej Pearsona:\n", pc, os.linesep)

    # Utworzenie modelu predykcji tj. predyktora z wykorzystaniem REGRESJI LINIOWEJ
    x_train = np.array(df_train[x_feature]).reshape((-1, 1))
    y_train = np.array(df_train[y_feature])
    model, description = predictor(x_train, y_train)
    print(description, os.linesep)

    # Wizualizacja modelu predykcji
    x = np.linspace(np.min(x_train), max(x_train), 5000)
    y = model.coef_ * x + model.intercept_
    chart_title = "MODEL PREDYKCJI\n" + title + " & " + "Regresja"
    visualize_plot_scatter(x_plot=x, y_plot=y, x_scatter=x_train, y_scatter=y_train,
                           title=chart_title, xlabel=xlabel, ylabel=ylabel)

    # Predykcja
    x_test = np.array(df_test[x_feature]).reshape((-1, 1))
    y_test = np.array(df_test[y_feature])
    df_prediction, description = prediction(model, x_test, y_test)
    print("Rezultat predykcji:")
    print(df_prediction, os.linesep)

    # Ocena [modelu] predykcji
    print(description, os.linesep)

    # Wizualizacja predykcji
    chart_title = "PREDYKCJA\n" + title + " & " + "Regresja"
    visualize_plot_scatter(x_plot=x_test, y_plot=df_prediction["y_pred"], x_scatter=x_test, y_scatter=y_test,
                           title=chart_title, xlabel=xlabel, ylabel=ylabel)


"""Uruchamienie eksperymentów"""
make_experiment_prediction(analysis_sale_by_week_query)
