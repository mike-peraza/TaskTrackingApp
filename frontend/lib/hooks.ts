import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "./api";
import type { Task } from "./schemas";

export function useTasks() {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
}
