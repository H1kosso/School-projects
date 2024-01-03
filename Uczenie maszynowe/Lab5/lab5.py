import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.utils import shuffle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report, mean_squared_error, mean_absolute_error

# Wczytaj dane

home_prices_csv = pd.read_csv('Home_prices.csv')
home_prices_df = pd.DataFrame(home_prices_csv)

print(home_prices_df.head())
# Kolumny
print(home_prices_df.columns)

# Usuniecie brakujacych wartosci
home_prices_df.dropna()

y_columns = 'SalePrice'
Y = home_prices_df[y_columns]

x_columns = ['OverallQual', 'OverallCond', 'YearBuilt', 'TotalBsmtSF', '1stFlrSF', '2ndFlrSF',
             'GrLivArea', 'LotArea', 'BsmtFinSF1', 'BsmtUnfSF', 'TotalBsmtSF',
             'FullBath', 'HalfBath', 'BedroomAbvGr', 'TotRmsAbvGrd', 'GarageArea']
X = home_prices_df[x_columns]

# Statystyki
print(X.describe())

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.1, random_state=42)

classifiers = [
    ('Linear Regression', LinearRegression()),
    ('Random Regressor', RandomForestRegressor(n_estimators=100, random_state=42)),
    ('Decision Tree Regressor', DecisionTreeRegressor())
]

for classifier_name, classifier in classifiers:
    classifier.fit(X_train, Y_train)
    predictions = classifier.predict(X_test)

    mse = mean_squared_error(Y_test, predictions)
    mae = mean_absolute_error(Y_test, predictions)

    print(f'{classifier_name} - MSE: {mse}, MAE: {mae}')