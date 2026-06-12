# Krishi Saathi - Backend API

The backend service for **Krishi Saathi**, providing RESTful APIs for user management, field data, and advisory generation. Built with FastAPI and SQLite.

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- pip

### Installation
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running Locally
Start the server using Uvicorn:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
API Documentation (Swagger UI) will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

## 🛠 Tech Stack
- **Framework**: FastAPI
- **Database**: SQLite (via SQLAlchemy)
- **Authentication**: JWT (JSON Web Tokens) with `passlib`
- **Validation**: Pydantic Schemas

## 🔑 Authentication
- **Default Admin User**:
    - Username: `admin`
    - Password: `password123`
- Use the `/auth/token` endpoint to login and receive a Bearer token.

## 📡 API Endpoints
- **Auth**: `/auth/register`, `/auth/token`
- **Fields**: `/fields/` (GET, POST)
- **Advisory**: `/advisory/{field_id}` (GET, POST)
