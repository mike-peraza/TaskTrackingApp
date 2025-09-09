import React, { useState } from "react";
import type { Task } from "../../../lib/schemas";
import { updateTask, deleteTask, toggleTaskComplete } from "../../../lib/api";

export default function TaskItem({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || "");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(task.completed);
  const handleMarkComplete = async () => {
    setLoading(true);
    setError("");
    try {
      const updated = await toggleTaskComplete(task.id);
      setCompleted(updated.completed);
      setShowCompleteConfirm(false);
    } catch (err) {
      setError("Failed to mark as complete");
    } finally {
      setLoading(false);
    }
  };

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
          <span
            style={{ cursor: completed ? 'default' : 'pointer', fontSize: '1.2em' }}
            title={completed ? "Completed" : "Mark as complete"}
            onClick={() => {
              if (!completed) setShowCompleteConfirm(true);
            }}
            role="button"
            aria-label={completed ? "Completed" : "Mark as complete"}
          >
            {completed ? "✅" : "❌"}
          </span>
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
              <span role="img" aria-label="delete">
                {/* Trash icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </span>
          </button>
        </>
      )}
      {showCompleteConfirm && (
        <div style={{ position: 'absolute', background: '#fff', border: '1px solid #ccc', padding: '1rem', zIndex: 10 }}>
          <div>Mark this task as complete?</div>
          <button onClick={handleMarkComplete} disabled={loading} style={{ color: 'green', marginRight: '0.5rem' }}>Yes, complete</button>
          <button onClick={() => setShowCompleteConfirm(false)} disabled={loading}>Cancel</button>
        </div>
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
