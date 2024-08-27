import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const EditJobModal = ({ isOpen, job, onClose }) => {
  const [listingTitle, setListingTitle] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const { user } = useContext(AuthContext);

  // Autofill the form with existing job data when modal is opened
  useEffect(() => {
    if (job) {
      setListingTitle(job.listingTitle || '');
      setJobTitle(job.jobTitle || '');
      setJobDescription(job.jobDescription || '');
    }
  }, [job]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in as a manager to edit a job.');
      return;
    }

    const updatedJobData = {
      listingTitle,
      jobTitle,
      jobDescription,
      dateListed: job.dateListed, // Preserve original date listed
      dateClosed: job.dateClosed || null, // Preserve or update closure date
      managerId: user.userId, 
      openStatus: job.openStatus,
      selectedCandidate: job.selectedCandidate || null,
    };

    try {
      const response = await axios.patch(`http://localhost:8081/api/jobs/update-job`, updatedJobData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      // Success response handling
      if (response.status === 200) {
        alert('Job updated successfully!');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      alert('An error occurred while updating the job.');
    }

    onClose(); // Close the modal after submission
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Edit Job</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={listingTitle}
            onChange={(e) => setListingTitle(e.target.value)}
            placeholder="Enter Listing Title"
            style={styles.input}
          />
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter Job Title"
            style={styles.input}
          />
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter Job Description"
            rows="4"
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>Save Changes</button>
          <button type="button" onClick={onClose} style={styles.button}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  input: {
    width: '100%',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textarea: {
    width: '100%',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    margin: '5px',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
  },
};

export default EditJobModal;
