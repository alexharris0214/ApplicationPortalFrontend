import React, { useState, useContext } from 'react';
import JobApplicationTrial from '../JobApplication/JobApplicationTrial';
import EditJobModal from '../PostModal/EditJobModal';
import ApplicantFeed from '../Applications/ApplicantFeed';
import { AuthContext } from '../../context/AuthContext'; 
import axios from 'axios';

const JobCard = ({ job, fetchData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isApplicantFeedOpen, setIsApplicantFeedOpen] = useState(false);
  const { user } = useContext(AuthContext);

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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/api/jobs/delete-job/${job.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      fetchData(); // Refresh job list after deleting
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const viewApps = () => {
    setIsApplicantFeedOpen(true);
  };

  const handleCloseApplicantFeed = () => {
    setIsApplicantFeedOpen(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        {job.listingTitle && <h3 className="job-title">{job.listingTitle}</h3>}
        {job.jobTitle && <h4 className="position-title"><strong>Position Title:</strong> {job.jobTitle}</h4>}
      </div>
      <div className="card-body">
        {job.dateListed && <p><strong>Date Listed:</strong> {new Date(job.dateListed).toLocaleDateString()}</p>}
        {job.dateClosed && <p><strong>Date Closed:</strong> {job.dateClosed ? new Date(job.dateClosed).toLocaleDateString() : 'N/A'}</p>}
        {job.positionCategory && <p><strong>Category:</strong> {job.positionCategory}</p>}
        {job.openStatus && <p><strong>Status:</strong> {job.openStatus ? 'Open' : 'Closed'}</p>}
        {job.state && <p><strong>State:</strong> {job.state}</p>} 
        {job.city && <p><strong>City:</strong> {job.city}</p>} 
        {job.jobDescription && <p><strong>Description:</strong> {job.jobDescription}</p>}
      </div>
      <div className="card-footer">
        {user && user.role === 'RECRUITER' && user.userId === job.managerId ? (
          <div className="button-group">
            <button onClick={handleDelete} className="style-button">Delete Job Posting</button>
            <button onClick={handleEditClick} className='style-button'>Edit Job Postings</button>
            <button onClick={viewApps} className='style-button'>View Applications</button>
          </div>
        ) : null}

        {user && user.role === 'CANDIDATE' && (
          <button onClick={handleApplyClick} className='style-button'>Apply</button>
        )}
      </div>

      {isModalOpen && <JobApplicationTrial job={job} onClose={handleCloseModal} />}
      {isEditModalOpen && <EditJobModal isOpen={isEditModalOpen} job={job} onClose={handleCloseEditModal} />}
      {isApplicantFeedOpen && (
        <div className="modal" style={modalStyles}>
          <ApplicantFeed jobId={job.id} onClose={handleCloseApplicantFeed} />
        </div>
      )}
    </div>
  );
};

const modalStyles = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
};

export default JobCard;