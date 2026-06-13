from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Seed database with default admin user if not already present
try:
    from seed import create_admin
    create_admin()
except Exception as e:
    print(f"Seeding failed: {e}")

app = FastAPI(title="Krishi Saathi Advisory Platform")

import os

# CORS setup
origins_env = os.getenv("ALLOWED_ORIGINS", "")
allow_origin_regex = r"https://.*\.vercel\.app"

if origins_env:
    if origins_env == "*":
        origins = ["*"]
        allow_credentials = False
        allow_origin_regex = None
    else:
        origins = [o.strip() for o in origins_env.split(",") if o.strip()]
        if "https://krishi-saathi-omega.vercel.app" not in origins:
            origins.append("https://krishi-saathi-omega.vercel.app")
        allow_credentials = True
else:
    origins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost",
        "https://krishi-saathi-omega.vercel.app",
    ]
    allow_credentials = True

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=allow_origin_regex,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Krishi Saathi Advisory Platform API"}

from routers import auth, fields, advisory, weather, market

app.include_router(auth.router)
app.include_router(fields.router)
app.include_router(advisory.router)
app.include_router(weather.router)
app.include_router(market.router)

