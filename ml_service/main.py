from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
# In a real scenario, we would load the trained model here
# import joblib
# model = joblib.load('model.pkl')

app = FastAPI(title="Krishi Saathi Yield Prediction Service")

class PredictionRequest(BaseModel):
    field_id: int
    features: dict = {}

class PredictionResponse(BaseModel):
    field_id: int
    yield_prediction: float
    confidence: float
    yield_gap: float

@app.get("/")
def read_root():
    return {"message": "ML Service is running"}

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    # Mock prediction logic
    # Real logic would use request.features to feed into the model
    
    # Random realistic yield for crops (kg/ha)
    base_yield = 1500
    variation = np.random.normal(0, 200)
    prediction = max(0, base_yield + variation)
    
    potential_yield = 2500
    yield_gap = potential_yield - prediction
    
    return PredictionResponse(
        field_id=request.field_id,
        yield_prediction=round(prediction, 2),
        confidence=0.85,
        yield_gap=round(yield_gap, 2)
    )
