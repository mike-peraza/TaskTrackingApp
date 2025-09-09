from typing import List, Optional
from mytodo.core.entities import Todo
from mytodo.core.repository import TodoRepositoryProtocol

class InMemoryTodoRepository(TodoRepositoryProtocol):
    def __init__(self):
        self._todos = {}
        self._next_id = 1

    def list(self) -> List[Todo]:
        return list(self._todos.values())

    def get(self, todo_id: int) -> Optional[Todo]:
        return self._todos.get(todo_id)

    def create(self, title: str, description: Optional[str] = None) -> Todo:
        todo = Todo(id=self._next_id, title=title, description=description)
        self._todos[self._next_id] = todo
        self._next_id += 1
        return todo

    def update(self, todo_id: int, title: Optional[str], description: Optional[str]) -> Optional[Todo]:
        todo = self._todos.get(todo_id)
        if not todo:
            return None
        if title is not None:
            todo.title = title
        if description is not None:
            todo.description = description
        self._todos[todo_id] = todo
        return todo

    def toggle(self, todo_id: int) -> Optional[Todo]:
        todo = self._todos.get(todo_id)
        if not todo:
            return None
        todo.completed = not todo.completed
        self._todos[todo_id] = todo
        return todo

    def delete(self, todo_id: int) -> bool:
        if todo_id in self._todos:
            del self._todos[todo_id]
            return True
        return False
