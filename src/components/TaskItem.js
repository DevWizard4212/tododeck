import React, { useState } from 'react';

function TaskItem({ task, onToggleComplete, onDelete, onEdit, onChangePriority }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleSubmit = () => {
    onEdit(task.id, editedText);
    setIsEditing(false);
  };

  // Priority colors
  const priorityColors = {
    low: '#8bc34a',    // Light green
    medium: '#ffc107', // Amber
    high: '#f44336'    // Red
  };

  // Get priority label for display
  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'low': return 'Low';
      case 'medium': return 'Medium';
      case 'high': return 'High';
      default: return 'Low';
    }
  };

  return (
    <div className={`task-item priority-${task.priority || 'low'}-item`}>
      {isEditing ? (
        <div className="task-edit">
          <input 
            type="text" 
            value={editedText} 
            onChange={(e) => setEditedText(e.target.value)} 
          />
          <button onClick={handleSubmit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="task-view">
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => onToggleComplete(task.id)} 
          />
          <span 
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            onClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
          <div className="task-actions">
            <div className="priority-badge">
              {getPriorityLabel(task.priority || 'low')}
            </div>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem; 