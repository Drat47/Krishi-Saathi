# Krishi Sathi: AI-Enabled Precision Advisory Platform

**Krishi Sathi** is a comprehensive solution designed to bridge the yield gap in Indian oilseed cultivation. By leveraging AI, satellite data, and precision agronomy, the platform empowers farmers with actionable, personalized advisories to optimize productivity.

## 🌟 Features
- **Smart Dashboard**: Centralized view of all farm lands and their health status.
- **Precision Advisory**: AI-driven recommendations for irrigation, fertilization, and pest management.
- **Yield Analytics**: Comparative insights against local benchmarks and global standards.
- **Satellite Mapping**: Interactive field visualization using Leaflet.
- **Secure Access**: JWT-based authentication with a secure, family-friendly login flow.

## 🏗 Architecture
The project follows a modern microservices-style architecture:
- **Frontend**: React + Vite + Tailwind CSS (Port 3000)
- **Backend**: FastAPI + SQLite (Port 8000)
- **ML Service**: Python Inference Service (Port 5000)
- **Orchestration**: Docker Compose

## 🚀 Quick Start

### Option 1: Docker (Recommended)
Run the entire stack with a single command:
```bash
docker-compose up -d --build
```
Access the app at [http://localhost:3000](http://localhost:3000).

### Option 2: Local Development
Follow the `README.md` instructions in each Service directory:
1. **Backend**: `cd backend` -> `pip install -r requirements.txt` -> `uvicorn main:app --reload`
2. **ML Service**: `cd ml_service` -> `pip install -r requirements.txt` -> `uvicorn main:app --port 5000`
3. **Frontend**: `cd frontend` -> `npm install` -> `npm run dev`

## 👤 Default Credentials
To log in immediately:
- **Username**: `admin`
- **Password**: `password123`

## 🤝 Contribution
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

---
*Empowering Indian Agriculture through Technology.*

# Krishi Saathi: AI-Enabled Precision Advisory Platform

**Krishi Saathi** is a comprehensive solution designed to bridge the yield gap in Indian oilseed cultivation. By leveraging AI, satellite data, and precision agronomy, the platform empowers farmers with actionable, personalized advisories to optimize productivity.

## 🌟 Features
- **Smart Dashboard**: Centralized view of all farm lands and their health status.
- **Precision Advisory**: AI-driven recommendations for irrigation, fertilization, and pest management.
- **Yield Analytics**: Comparative insights against local benchmarks and global standards.
- **Satellite Mapping**: Interactive field visualization using Leaflet.
- **Secure Access**: JWT-based authentication with a secure, family-friendly login flow.

## 🏗 Architecture
The project follows a modern microservices-style architecture:
- **Frontend**: React + Vite + Tailwind CSS (Port 3000)
- **Backend**: FastAPI + SQLite (Port 8000)
- **ML Service**: Python Inference Service (Port 5000)
- **Orchestration**: Docker Compose

## 🚀 Quick Start

### Option 1: Docker (Recommended)
Run the entire stack with a single command:
```bash
docker-compose up -d --build
```
Access the app at [http://localhost:3000](http://localhost:3000).

### Option 2: Local Development
Follow the `README.md` instructions in each Service directory:
1. **Backend**: `cd backend` -> `pip install -r requirements.txt` -> `uvicorn main:app --reload`
2. **ML Service**: `cd ml_service` -> `pip install -r requirements.txt` -> `uvicorn main:app --port 5000`
3. **Frontend**: `cd frontend` -> `npm install` -> `npm run dev`

## 👤 Default Credentials
To log in immediately:
- **Username**: `admin`
- **Password**: `password123`

## 🤝 Contribution
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

---
*Empowering Indian Agriculture through Technology.*
