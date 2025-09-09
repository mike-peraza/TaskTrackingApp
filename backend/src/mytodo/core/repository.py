from typing import List, Optional
from .entities import Todo

class TodoRepositoryProtocol:
    def list(self) -> List[Todo]:
        raise NotImplementedError

    def get(self, todo_id: int) -> Optional[Todo]:
        raise NotImplementedError

    def create(self, title: str, description: Optional[str] = None) -> Todo:
        raise NotImplementedError

    def update(self, todo_id: int, title: Optional[str], description: Optional[str]) -> Optional[Todo]:
        raise NotImplementedError

    def toggle(self, todo_id: int) -> Optional[Todo]:
        raise NotImplementedError

    def delete(self, todo_id: int) -> bool:
        raise NotImplementedError
