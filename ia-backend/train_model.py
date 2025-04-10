# ia-backend/train_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from joblib import dump
import kagglehub

# Définir le chemin vers le fichier CSV
file_path = r"D:\Dorra\Desktop\Bour\BourLaForme\ia-backend\gym_members_exercise_tracking.csv"

# Charger le dataset à partir du fichier CSV
df = pd.read_csv(file_path)

# Afficher les premières lignes pour vérifier que tout est bien chargé
print(df.head())

# Encoder les colonnes catégorielles
df['Gender'] = LabelEncoder().fit_transform(df['Gender'])
df['Workout_Type'] = LabelEncoder().fit_transform(df['Workout_Type'])

# Définir X et y
X = df.drop(['Workout_Type'], axis=1)
y = df['Workout_Type']

# Créer et entraîner le modèle
model = RandomForestClassifier()
model.fit(X, y)

# Sauvegarder le modèle
dump(model, 'model.joblib')
