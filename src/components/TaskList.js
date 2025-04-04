import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleComplete, onDelete, onEdit, onChangePriority }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
            onChangePriority={onChangePriority}
          />
        ))
      )}
    </div>
  );
}

export default TaskList; 