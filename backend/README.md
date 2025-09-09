# FastAPI Backend - TaskTrackingApp

This backend is built with FastAPI and serves as the API for the TaskTrackingApp.

## Prerequisites
- Python 3.12+
- Docker & Docker Compose (recommended)
- (Optional) Virtual environment tool (venv, poetry, etc.)

## Quick Start (Recommended: Docker Compose)

1. **Build the backend image:**
   ```pwsh
   docker-compose build backend
   ```

2. **Run database migrations:**
   ```pwsh
   docker-compose exec backend alembic upgrade head
   ```

3. **Start the FastAPI server:**
   ```pwsh
   docker-compose up backend
   ```

4. **Access the API docs:**
   Open [http://localhost:8000/docs](http://localhost:8000/docs) in your browser.

---

## Manual Setup (Without Docker)

1. **Create and activate a virtual environment:**
   ```pwsh
   python -m venv .venv
   .venv\Scripts\Activate.ps1
   ```

2. **Install dependencies:**
   ```pwsh
   pip install -r requirements.txt
   ```

3. **Run database migrations:**
   ```pwsh
   alembic upgrade head
   ```

4. **Start the FastAPI server:**
   ```pwsh
   uvicorn mytodo.presentation.main:app --reload
   ```

5. **Access the API docs:**
   Open [http://localhost:8000/docs](http://localhost:8000/docs) in your browser.

---

## Project Structure
- `src/mytodo/presentation/main.py`: FastAPI app entry point
- `src/mytodo/presentation/router.py`: API routes
- `src/mytodo/infrastructure/`: Database and repository implementations
- `src/mytodo/core/`: Core entities and business logic

---

## Useful Commands
- Run tests: *(add your test command here)*
- Rebuild Docker images: `docker-compose build`
- Stop containers: `docker-compose down`
