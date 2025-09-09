from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from .models import Todo, Base
from typing import List, Optional

DATABASE_URL = "postgresql+asyncpg://myuser:mypassword@localhost:5432/mytodo"
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

class SQLTodoRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, title: str, description: Optional[str]) -> Todo:
        todo = Todo(title=title, description=description)
        self.session.add(todo)
        await self.session.commit()
        await self.session.refresh(todo)
        return todo

    async def list(self) -> List[Todo]:
        from sqlalchemy import select
        result = await self.session.execute(select(Todo))
        return result.scalars().all()

    async def get(self, todo_id: int) -> Optional[Todo]:
        from sqlalchemy import select
        result = await self.session.execute(select(Todo).where(Todo.id == todo_id))
        return result.scalars().first()

    async def update(self, todo_id: int, title: str, description: Optional[str]) -> Optional[Todo]:
        todo = await self.get(todo_id)
        if todo:
            todo.title = title
            todo.description = description
            self.session.add(todo)
            await self.session.commit()
            await self.session.refresh(todo)
        return todo

    async def toggle(self, todo_id: int) -> Optional[Todo]:
        todo = await self.get(todo_id)
        if todo:
            todo.completed = not todo.completed
            self.session.add(todo)
            await self.session.commit()
            await self.session.refresh(todo)
        return todo

    async def delete(self, todo_id: int) -> bool:
        todo = await self.get(todo_id)
        if todo:
            await self.session.delete(todo)
            await self.session.commit()
            return True
        return False
