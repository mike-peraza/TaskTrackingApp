import React, { useState } from "react";
import type { Task } from "../../../lib/schemas";
import { updateTask, deleteTask } from "../../../lib/api";

export default function TaskItem({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || "");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setError("");
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      await updateTask(task.id, { title: editTitle, description: editDescription });
      setIsEditing(false);
      // Optionally, trigger a refresh in parent via context or props
      window.location.reload(); // quick solution for now
    } catch (err) {
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await deleteTask(task.id);
      setShowConfirm(false);
      // Optionally, trigger a refresh in parent via context or props
      window.location.reload(); // quick solution for now
    } catch (err) {
      setError("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            disabled={loading}
            style={{ marginRight: '0.5rem' }}
          />
          <input
            type="text"
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            disabled={loading}
            placeholder="Description (optional)"
            style={{ marginRight: '0.5rem' }}
          />
          <button onClick={handleSave} disabled={loading || !editTitle.trim()}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)} disabled={loading}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          {task.description && <span style={{ color: '#888', fontSize: '0.9em' }}>({task.description})</span>}
          <span>{task.completed ? "✅" : "❌"}</span>
          <button
            onClick={handleEdit}
            title="Edit"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}
          >
            <span role="img" aria-label="edit">✏️</span>
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            title="Delete"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red', fontWeight: 'bold' }}
          >
            <span role="img" aria-label="delete">❌</span>
          </button>
        </>
      )}
      {showConfirm && (
        <div style={{ position: 'absolute', background: '#fff', border: '1px solid #ccc', padding: '1rem', zIndex: 10 }}>
          <div>Are you sure you want to delete this task?</div>
          <button onClick={handleDelete} disabled={loading} style={{ color: 'red', marginRight: '0.5rem' }}>Yes, delete</button>
          <button onClick={() => setShowConfirm(false)} disabled={loading}>Cancel</button>
        </div>
      )}
      {error && <span style={{ color: 'red', marginLeft: '0.5rem' }}>{error}</span>}
    </li>
  );
}
