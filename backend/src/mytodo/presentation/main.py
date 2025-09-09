from fastapi import FastAPI
from mytodo.presentation.router import router

app = FastAPI()
app.include_router(router)
