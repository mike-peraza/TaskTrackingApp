from typing import List, Optional
from mytodo.core.entities import Todo
from mytodo.core.repository import TodoRepositoryProtocol
from mytodo.core.errors import TodoNotFoundError

class CreateTodo:
    def __init__(self, repo: TodoRepositoryProtocol):
        self.repo = repo
    def execute(self, title: str, description: Optional[str] = None) -> Todo:
        return self.repo.create(title, description)

class ListTodos:
    def __init__(self, repo: TodoRepositoryProtocol):
        self.repo = repo
    def execute(self) -> List[Todo]:
        return self.repo.list()

class GetTodo:
    def __init__(self, repo: TodoRepositoryProtocol):
        self.repo = repo
    def execute(self, todo_id: int) -> Todo:
        todo = self.repo.get(todo_id)
        if not todo:
            raise TodoNotFoundError()
        return todo

class UpdateTodo:
    def __init__(self, repo: TodoRepositoryProtocol):
        self.repo = repo
    def execute(self, todo_id: int, title: Optional[str], description: Optional[str]) -> Todo:
        todo = self.repo.update(todo_id, title, description)
        if not todo:
            raise TodoNotFoundError()
        return todo

class ToggleTodo:
    def __init__(self, repo: TodoRepositoryProtocol):
        self.repo = repo
    def execute(self, todo_id: int) -> Todo:
        todo = self.repo.toggle(todo_id)
        if not todo:
            raise TodoNotFoundError()
        return todo

class DeleteTodo:
    def __init__(self, repo: TodoRepositoryProtocol):
        self.repo = repo
    def execute(self, todo_id: int) -> None:
        success = self.repo.delete(todo_id)
        if not success:
            raise TodoNotFoundError()
