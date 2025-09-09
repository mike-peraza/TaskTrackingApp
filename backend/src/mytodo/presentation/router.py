from fastapi import APIRouter, Depends, HTTPException
from typing import List
from mytodo.presentation.schemas import TodoCreate, TodoUpdate, TodoOut
from mytodo.application.use_cases import (
    CreateTodo, ListTodos, GetTodo, UpdateTodo, ToggleTodo, DeleteTodo
)
from mytodo.infrastructure.inmemory_repo import InMemoryTodoRepository
from mytodo.core.errors import TodoNotFoundError

router = APIRouter()
repo = InMemoryTodoRepository()

@router.post("/todos", response_model=TodoOut)
def create_todo(data: TodoCreate):
    todo = CreateTodo(repo).execute(data.title, data.description)
    return todo

@router.get("/todos", response_model=List[TodoOut])
def list_todos():
    return ListTodos(repo).execute()

@router.get("/todos/{todo_id}", response_model=TodoOut)
def get_todo(todo_id: int):
    try:
        return GetTodo(repo).execute(todo_id)
    except TodoNotFoundError:
        raise HTTPException(status_code=404, detail="Todo not found")

@router.put("/todos/{todo_id}", response_model=TodoOut)
def update_todo(todo_id: int, data: TodoUpdate):
    try:
        return UpdateTodo(repo).execute(todo_id, data.title, data.description)
    except TodoNotFoundError:
        raise HTTPException(status_code=404, detail="Todo not found")

@router.patch("/todos/{todo_id}/toggle", response_model=TodoOut)
def toggle_todo(todo_id: int):
    try:
        return ToggleTodo(repo).execute(todo_id)
    except TodoNotFoundError:
        raise HTTPException(status_code=404, detail="Todo not found")

@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    try:
        DeleteTodo(repo).execute(todo_id)
        return {"detail": "Deleted"}
    except TodoNotFoundError:
        raise HTTPException(status_code=404, detail="Todo not found")
