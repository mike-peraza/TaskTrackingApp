
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from mytodo.presentation.schemas import TodoCreate, TodoUpdate, TodoOut
from mytodo.infrastructure.sql_repo import SQLTodoRepository
from mytodo.infrastructure.db import get_session

router = APIRouter()

@router.post("/todos", response_model=TodoOut)
async def create_todo(data: TodoCreate, session: AsyncSession = Depends(get_session)):
    repo = SQLTodoRepository(session)
    todo = await repo.create(data.title, data.description)
    return todo

@router.get("/todos", response_model=List[TodoOut])
async def list_todos(session: AsyncSession = Depends(get_session)):
    repo = SQLTodoRepository(session)
    todos = await repo.list()
    return todos

@router.get("/todos/{todo_id}", response_model=TodoOut)
async def get_todo(todo_id: int, session: AsyncSession = Depends(get_session)):
    repo = SQLTodoRepository(session)
    todo = await repo.get(todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@router.put("/todos/{todo_id}", response_model=TodoOut)
async def update_todo(todo_id: int, data: TodoUpdate, session: AsyncSession = Depends(get_session)):
    repo = SQLTodoRepository(session)
    todo = await repo.update(todo_id, data.title, data.description)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@router.patch("/todos/{todo_id}/toggle", response_model=TodoOut)
async def toggle_todo(todo_id: int, session: AsyncSession = Depends(get_session)):
    repo = SQLTodoRepository(session)
    todo = await repo.toggle(todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@router.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int, session: AsyncSession = Depends(get_session)):
    repo = SQLTodoRepository(session)
    success = await repo.delete(todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"detail": "Deleted"}
