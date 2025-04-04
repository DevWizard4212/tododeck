import React, { useState, useEffect } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import ProjectList from './components/ProjectList';
import AddProject from './components/AddProject';

function App() {
  // Load projects from localStorage or start with default
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [
      { id: 'inbox', name: 'Inbox' }
    ];
  });

  // Load tasks from localStorage or start with empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [activeProject, setActiveProject] = useState('inbox');

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [tasks, projects]);

  // Add a new task
  const addTask = (text, priority = 'low') => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      date: new Date().toISOString(),
      projectId: activeProject,
      priority
    };
    setTasks([...tasks, newTask]);
  };

  // Add a new project
  const addProject = (name) => {
    const newProject = {
      id: Date.now().toString(),
      name
    };
    setProjects([...projects, newProject]);
  };

  // Toggle task completion status
  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Edit a task
  const editTask = (id, newText) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // Change task priority
  const changePriority = (id, priority) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, priority } : task
      )
    );
  };

  // Filter tasks by active project
  const filteredTasks = tasks.filter(task => task.projectId === activeProject);

  return (
    <div className="app">
      <header>
        <h1>Tododeck</h1>
      </header>
      <div className="app-container">
        <aside className="sidebar">
          <ProjectList 
            projects={projects} 
            activeProject={activeProject} 
            onSelectProject={setActiveProject} 
          />
          <AddProject onAdd={addProject} />
        </aside>
        <main className="content">
          <h2>{projects.find(p => p.id === activeProject)?.name || 'Tasks'}</h2>
          <AddTask onAdd={addTask} />
          <TaskList 
            tasks={filteredTasks} 
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
            onEdit={editTask}
            onChangePriority={changePriority}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
