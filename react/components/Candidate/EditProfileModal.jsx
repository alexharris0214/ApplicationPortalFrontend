import React, { useState } from 'react';
import axios from 'axios';

const EditProfileModal = ({ candidate, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: candidate.firstName || '',
    lastName: candidate.lastName || '',
    email: candidate.email || '',
    phoneNumber: candidate.phoneNumber || '',
    address: candidate.address || '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your actual API endpoint and candidate ID
    axios.put(`https://api.example.com/candidate/1`, formData)
      .then(response => {
        onClose(response.data); // Pass the updated candidate data back to the parent
      })
      .catch(error => console.error('Error updating candidate data:', error));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
            />
          </div>
          {/* Add more fields as needed */}
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => onClose(null)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
