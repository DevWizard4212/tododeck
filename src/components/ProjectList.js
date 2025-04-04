import React from 'react';

function ProjectList({ projects, activeProject, onSelectProject }) {
  return (
    <div className="project-list">
      <h2>Projects</h2>
      <ul>
        {projects.map(project => (
          <li 
            key={project.id}
            className={activeProject === project.id ? 'active' : ''}
            onClick={() => onSelectProject(project.id)}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList; 