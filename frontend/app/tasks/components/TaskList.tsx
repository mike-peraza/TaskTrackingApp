"use client";
import React from "react";
import TaskItem from "./TaskItem";
import { useTasks } from "../../../lib/hooks";

export default function TaskList() {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;
  if (!tasks?.length) return <div>No tasks found.</div>;

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
