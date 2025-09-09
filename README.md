# TaskTrackingApp

## Overview
TaskTrackingApp is a full-stack application for managing tasks, featuring a Python backend and a Next.js frontend. The backend provides RESTful APIs for task management, while the frontend offers a modern user interface for interacting with tasks.

## Project Structure
```
TaskTrackingApp/
├── backend/         # Python FastAPI backend, database, and business logic
│   └── src/mytodo/  # Application modules (core, infrastructure, presentation, config)
├── frontend/        # Next.js frontend application
├── docker-compose.yml # Docker Compose configuration for backend and database
└── package.json     # Project metadata
```

- **backend/**: Contains the FastAPI backend, including business logic, database models, and API routes.
- **frontend/**: Contains the Next.js frontend, including pages, components, and styles.
- **docker-compose.yml**: Defines services for running the backend and database in Docker containers.

## Running the Backend and Database with Docker
1. Ensure Docker is installed and running on your machine.
2. From the project root, run:
   ```sh
   docker-compose up
   ```
   This will start the backend API and the database (e.g., PostgreSQL) in containers.
3. The backend API will be available at `http://localhost:8000` (default).

## Running the Frontend Locally
1. Open a terminal and navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. The frontend will be available at `http://localhost:3000`.

## Summary
- Backend and database run in Docker containers for easy setup.
- Frontend runs locally with `npm run dev` for rapid development.
- Modular project structure for maintainability and scalability.

For more details, see the `backend/README.md` and `frontend/README.md` files.
