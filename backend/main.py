from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Oilseed Advisory Platform")

import os

# CORS setup
origins_env = os.getenv("ALLOWED_ORIGINS", "")
if origins_env:
    if origins_env == "*":
        origins = ["*"]
        allow_credentials = False
    else:
        origins = [o.strip() for o in origins_env.split(",") if o.strip()]
        allow_credentials = True
else:
    origins = [
        "http://localhost:3000",
        "http://localhost",
    ]
    allow_credentials = True

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Oilseed Advisory Platform API"}

from routers import auth, fields, advisory, weather, market

app.include_router(auth.router)
app.include_router(fields.router)
app.include_router(advisory.router)
app.include_router(weather.router)
app.include_router(market.router)

