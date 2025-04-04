import React, { useState } from 'react';

function AddTask({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    onAdd(text, priority);
    setText('');
    setPriority('low');
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Add a new task..." 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}
        className={`priority-select priority-${priority}`}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTask; 