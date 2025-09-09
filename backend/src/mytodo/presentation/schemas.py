from typing import Optional
from pydantic import BaseModel

class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None

class TodoOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool
