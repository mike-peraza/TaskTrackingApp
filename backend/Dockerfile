# Use official Python image
FROM python:3.12-slim

# Set work directory for correct imports
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential

# Copy project files
COPY . /app

# Install Python dependencies using pip
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Ensure src is in Python path for imports
ENV PYTHONPATH=/app/src

# Expose port for FastAPI
EXPOSE 8000

# Start FastAPI app
CMD ["uvicorn", "src.mytodo.presentation.main:app", "--host", "0.0.0.0", "--port", "8000"]
