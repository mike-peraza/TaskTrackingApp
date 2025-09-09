import { TaskSchema, Task } from "./schemas";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch("/api/tasks");
  const data = await res.json();
  return TaskSchema.array().parse(data);
}
