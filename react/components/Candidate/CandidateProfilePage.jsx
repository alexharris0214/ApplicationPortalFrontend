import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProfileModal from './EditProfileModal';

const CandidateProfilePage = () => {
  const [candidate, setCandidate] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCandidateData = () => {
    axios.get('https://api.example.com/candidate/1')
      .then(response => setCandidate(response.data))
      .catch(error => console.error('Error fetching candidate data:', error));
  };

  useEffect(() => {
    fetchCandidateData();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchCandidateData(); // Refetch the candidate data after closing the modal
  };

  return (
    <div className="candidate-profile-page">
      <h1>Candidate Profile</h1>
      <div className="profile-info">
        <p><strong>First Name:</strong> {candidate.firstName}</p>
        <p><strong>Last Name:</strong> {candidate.lastName}</p>
        <p><strong>Email:</strong> {candidate.email}</p>
        <p><strong>Phone Number:</strong> {candidate.phoneNumber}</p>
        <p><strong>Address:</strong> {candidate.address}</p>
        {/* Add more fields as needed */}
      </div>
      <button onClick={handleEditClick}>Edit Profile</button>
      
      {isModalOpen && (
        <EditProfileModal 
          candidate={candidate} 
          onClose={handleModalClose} 
        />
      )}
    </div>
  );
};

export default CandidateProfilePage;
