"use client";
import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { useTasks } from "../../../lib/hooks";
import { addTask } from "../../../lib/api";

export default function TaskList() {
  const { data: tasks, isLoading, error: tasksError, refetch } = useTasks();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setLoading(true);
    setFormError("");
    try {
      await addTask({ title: newTitle, description: newDescription || undefined });
      setNewTitle("");
      setNewDescription("");
      if (refetch) refetch();
    } catch (err) {
      setFormError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreate} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="New task title"
          disabled={loading}
          required
        />
        <input
          type="text"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
          placeholder="Description (optional)"
          disabled={loading}
          style={{ marginLeft: '0.5rem' }}
        />
        <button type="submit" disabled={loading || !newTitle.trim()} style={{ marginLeft: '0.5rem' }}>
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
      {formError && <div style={{ color: "red" }}>{formError}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : tasksError ? (
        <div>Error loading tasks</div>
      ) : !tasks?.length ? (
        <div>No tasks found.</div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}
