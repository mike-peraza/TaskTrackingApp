from typing import Optional
from dataclasses import dataclass

@dataclass
class Todo:
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False
