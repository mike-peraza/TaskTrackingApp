
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mytodo.presentation.router import router
from mytodo.infrastructure.db import engine
from mytodo.infrastructure.models import Base

app = FastAPI()
app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auto-create tables on startup
@app.on_event("startup")
async def on_startup():
	async with engine.begin() as conn:
		await conn.run_sync(Base.metadata.create_all)
