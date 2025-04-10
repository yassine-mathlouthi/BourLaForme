from fastapi import FastAPI
from pydantic import BaseModel
from joblib import load
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Autoriser Angular
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Charger le modèle
model = load("model.joblib")

# Schéma de données d’entrée
class UserData(BaseModel):
    Age: int
    Gender: str
    Weight: float
    Height: float
    Max_BPM: int
    Avg_BPM: int
    Resting_BPM: int
    Session_Duration: float
    Calories_Burned: int
    Fat_Percentage: float
    Water_Intake: float
    Workout_Frequency: int
    Experience_Level: int
    BMI: float

# Encode le genre
def encode_gender(gender: str) -> int:
    return 1 if gender.lower() == "male" else 0

@app.post("/predict")
def predict(data: UserData):
    input_data = np.array([
        data.Age,
        encode_gender(data.Gender),
        data.Weight,
        data.Height,
        data.Max_BPM,
        data.Avg_BPM,
        data.Resting_BPM,
        data.Session_Duration,
        data.Calories_Burned,
        data.Fat_Percentage,
        data.Water_Intake,
        data.Workout_Frequency,
        data.Experience_Level,
        data.BMI
    ]).reshape(1, -1)

    prediction = model.predict(input_data)[0]
    return {"recommended_workout_type": int(prediction)}
