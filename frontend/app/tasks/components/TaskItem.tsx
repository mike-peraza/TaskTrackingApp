import React from "react";
import type { Task } from "../../../lib/schemas";

export default function TaskItem({ task }: { task: Task }) {
  return (
    <li>
      <span>{task.title}</span>
      <span>{task.completed ? "✅" : "❌"}</span>
    </li>
  );
}
