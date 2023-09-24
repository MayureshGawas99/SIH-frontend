import React from 'react';

const EducationYearDropdown = ({ value, onChange }) => {
  const years = ['Freshman', 'Sophomore', 'Junior', 'Senior'];

  return (
    <div className="education-dropdown">
      <label>Education Year:</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EducationYearDropdown;
