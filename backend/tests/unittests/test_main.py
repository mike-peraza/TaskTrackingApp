import pytest
from httpx import AsyncClient
from mytodo.presentation.main import app

@pytest.mark.asyncio
async def test_list_todos():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/todos")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_create_todo():
    payload = {"title": "Test Todo", "description": "Test Description"}
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/todos", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == payload["title"]
    assert data["description"] == payload["description"]
    assert "id" in data


