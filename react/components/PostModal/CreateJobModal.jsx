import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import StateDropdown from '../JobApplication/StateDropDown';

const CreateJobModal = ({ isOpen, onClose }) => {
  const [listingTitle, setListingTitle] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [positionCategory, setPositionCategory] = useState('');
  const { user } = useContext(AuthContext);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in as a manager to create a job.');
      return;
    }

    const jobData = {
      listingTitle,
      jobTitle,
      jobDescription,
      city,
      state,
      positionCategory,
      dateListed: new Date(),
      dateClosed: null,
      managerId: user.userId, 
      openStatus: true,
      selectedCandidate: null
    };

    try {
      const response = await axios.post('http://localhost:8081/api/jobs/create-job', jobData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Job created successfully!');
      } else {
        alert('Failed to create the job.');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      alert('An error occurred while creating the job.');
    }

    setListingTitle('');
    setJobTitle('');
    setJobDescription('');
    setCity('');
    setState('');
    setPositionCategory('');
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Create a New Job</h2>
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
          

          <StateDropdown
            setStateSetter = {setState}
            placeholder={"Select a state"}
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City"
            style={styles.input}
          />


          <select
            value={positionCategory}
            onChange={(e) => setPositionCategory(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Position Category</option>
            <option value="DEVELOPER">Developer</option>
            <option value="SALES">Sales</option>
            <option value="HR">HR</option>
            <option value="OPERATIONS">Operations</option>
          </select>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter Job Description"
            rows="4"
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>Create Job</button>
          <button type="button" onClick={onClose} style={styles.button}>Close</button>
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
    width: '80%',
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

export default CreateJobModal;
