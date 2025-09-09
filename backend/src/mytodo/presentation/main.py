
from fastapi import FastAPI
from mytodo.presentation.router import router
from mytodo.infrastructure.db import engine
from mytodo.infrastructure.models import Base

app = FastAPI()
app.include_router(router)

# Auto-create tables on startup
@app.on_event("startup")
async def on_startup():
	async with engine.begin() as conn:
		await conn.run_sync(Base.metadata.create_all)
