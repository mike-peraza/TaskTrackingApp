import { render, screen } from "@testing-library/react";
import TaskItem from "../app/tasks/components/TaskItem";
import type { Task } from "../lib/schemas";

describe("TaskItem", () => {
  it("renders task title and status", () => {
    const task: Task = { id: 1, title: "Test Task", completed: false };
    render(<TaskItem task={task} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("❌")).toBeInTheDocument();
  });
});
