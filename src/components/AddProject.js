import React, { useState } from 'react';

function AddProject({ onAdd }) {
  const [name, setName] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onAdd(name);
    setName('');
    setIsFormVisible(false);
  };

  return (
    <div className="add-project">
      {isFormVisible ? (
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Project name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <div className="form-buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={() => setIsFormVisible(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setIsFormVisible(true)}>+ Add Project</button>
      )}
    </div>
  );
}

export default AddProject; 