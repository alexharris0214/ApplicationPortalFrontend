import React, { useState, useContext } from 'react';
import JobApplication from '../JobApplication/JobApplication';
import { AuthContext } from '../../context/AuthContext'; 

const JobCard = ({ job }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card" style={styles.card}>
      {job.id && <h3>Job ID: {job.id}</h3>}
      {job.listingTitle && <h3>{job.listingTitle}</h3>}
      {job.jobTitle && <h3>{job.jobTitle}</h3>}
      {job.managerId && <p><strong>Manager ID:</strong> {job.managerId}</p>}
      {job.dateListed && <p><strong>Date Listed:</strong> {new Date(job.dateListed).toLocaleDateString()}</p>}
      {job.dateClosed && <p><strong>Date Closed:</strong> {job.dateClosed ? new Date(job.dateClosed).toLocaleDateString() : 'N/A'}</p>}
      {job.openStatus && <p><strong>Status:</strong> {job.openStatus ? 'Open' : 'Closed'}</p>}
      {job.jobDescription && <p><strong>Description:</strong> {job.jobDescription}</p>}
      {/* {job.selectedCandidateId && <p><strong>Selected Candidate ID:</strong> {job.selectedCandidateId}</p>} */}


      {/* Conditionally render the Apply button */}
      {user && user.role==='CANDIDATE' && (
        <button onClick={handleApplyClick}>Apply</button>
      )}

      {/* Job Application Modal */}
      {isModalOpen && (
        <JobApplication 
          job={job} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    border: '1px solid black',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px',
  },
};

export default JobCard;
