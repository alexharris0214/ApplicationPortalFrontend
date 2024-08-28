import React from 'react';

const ApplicantCard = ({ applicant, onSelect }) => {
  const handleSelect = () => {
    console.log('Candidate Selected');
    onSelect(applicant.id); // Optionally pass the applicant ID or other details
  };

  return (
    <div className="applicant-card" style={styles.card}>
      <p><strong>User ID:</strong> {applicant.userId}</p>
      <p><strong>Cover Letter:</strong> {applicant.coverLetter}</p>
      <p><strong>Resume:</strong></p>
      <a href={applicant.resume} download target="_blank" rel="noopener noreferrer">
        <button className="style-button">
          <strong>Download Resume</strong>
        </button>
      </a>
      <button onClick={handleSelect} className="style-button">
        <strong>Select Candidate</strong>
      </button>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    border: '1px solid black',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    marginBottom: '16px',
  },
};

export default ApplicantCard;
