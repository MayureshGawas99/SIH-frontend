import React, { useState } from 'react';

const TechnicalProjects = ({ projects, onAddProject }) => {
  const [newProject, setNewProject] = useState('');

  const handleAddProject = () => {
    if (newProject.trim() !== '') {
      onAddProject(newProject);
      setNewProject('');
    }
  };

  return (
    <div className="technical-projects">
      <h2>Technical Projects:</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>{project}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Add a project"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <button onClick={handleAddProject}>Add</button>
      </div>
    </div>
  );
};

export default TechnicalProjects;
