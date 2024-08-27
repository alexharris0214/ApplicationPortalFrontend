import React, { useState, useContext } from 'react';
import JobApplication from '../JobApplication/JobApplication';
import EditJobModal from '../PostModal/EditJobModal';
import { AuthContext } from '../../context/AuthContext'; 
import axios from 'axios';

const JobCard = ({ job, fetchData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(job)
  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    fetchData(); // Refresh job list after editing
  };
  
  const handleDelete = async (e) => {
    e.preventDefault();
    // const requestBody = {
    //   jobId: job.id
    // };
    // const headers = {
    //   Authorization: "Bearer " + user.token
    // }
    // console.log(headers)

    try {
      const response = await axios.delete(`http://localhost:8081/api/jobs/delete-job/${job.id}`, 
          {headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });
       // fetchData(); // Refresh job list after deleting
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const viewApps = () => {
    console.log("Viewing applications");
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

      {user && user.role === 'RECRUITER' && (
        <div>
          <button onClick={handleDelete} className="style-button">
            <strong>Delete Job Posting</strong>
          </button>
          <button onClick={handleEditClick} className='style-button'>
            <strong>Edit Job Postings</strong>
          </button>
          <button onClick={viewApps} className='style-button'>
            <strong>View Applications</strong>
          </button>
        </div>
      )}

      {/* Conditionally render the Apply button */}
      {user && user.role === 'CANDIDATE' && (
        <button onClick={handleApplyClick}>Apply</button>
      )}

      {/* Job Application Modal */}
      {isModalOpen && (
        <JobApplication 
          job={job} 
          onClose={handleCloseModal} 
        />
      )}

      {/* Edit Job Modal */}
      {isEditModalOpen && (
        <EditJobModal
          isOpen={isEditModalOpen} 
          job={job}
          onClose={handleCloseEditModal}
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
  }
};

export default JobCard;
