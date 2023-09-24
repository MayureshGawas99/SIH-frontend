import React from 'react';

const ExpertiseDropdown = ({ value, onChange }) => {
  const expertiseOptions = ['Web Development', 'Data Science', 'UI/UX', 'Other'];

  return (
    <div className="expertise-dropdown">
      <label>Expertise:</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select Expertise</option>
        {expertiseOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpertiseDropdown;
