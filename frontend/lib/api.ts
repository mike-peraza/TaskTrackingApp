import { TaskSchema, Task } from "./schemas";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/todos`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  const data = await res.json();
  return TaskSchema.array().parse(data);
}

export async function addTask(task: { title: string; description?: string }): Promise<Task> {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(id: number, updates: { completed?: boolean; title?: string }): Promise<Task> {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return await res.json();
}

export async function deleteTask(id: number): Promise<boolean> {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
  return true;
}
