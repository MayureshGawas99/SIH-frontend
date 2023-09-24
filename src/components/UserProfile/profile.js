import React, { useState } from 'react';
import EducationYearDropdown from './educationYear';
import ExpertiseDropdown from './expertise';
import TechnicalProjects from './technicalProject';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    profileImage: null,
    educationYear: '',
    expertise: '',
    technicalProjects: [],
  });

  const handleImageUpload = (event) => {
    // Handle image upload similar to the previous example
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          {/* Image upload similar to the previous example */}
        </div>
        <div>
          <h1 className="text-3xl font-semibold">{userData.name}</h1>
          <p className="text-gray-600">Email: {userData.email}</p>
        </div>
      </div>
      <EducationYearDropdown
        value={userData.educationYear}
        onChange={(year) => setUserData({ ...userData, educationYear: year })}
      />
      <ExpertiseDropdown
        value={userData.expertise}
        onChange={(expertise) => setUserData({ ...userData, expertise })}
      />
      <TechnicalProjects
        projects={userData.technicalProjects}
        onAddProject={(project) =>
          setUserData({
            ...userData,
            technicalProjects: [...userData.technicalProjects, project],
          })
        }
      />
    </div>
  );
};

export default Profile;
