# Basic config for FastAPI app
APP_NAME = "MyTodo"
LOG_LEVEL = "INFO"

# Dockerized Postgres connection string
import os
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://myuser:mypassword@localhost:5432/mytodo")
