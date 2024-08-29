import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const JobApplication = ({ job, onClose }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState('');
  const { user } = useContext(AuthContext); // Get the userId from context

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to apply.');
      return;
    }

    const applicationData = {
      userId: user.userId, // Adjusted to match the request body format
      jobId: job.id, // Ensure this is the correct field from job object
      dateApplied: new Date().toISOString(), // Ensure date is in the correct format
      coverLetter,
      resume,
      open: true,
    };

    console.log("Checking user context from job app", user);
    console.log(JSON.stringify(applicationData, null, 2));

    // Close the modal after submission
    onClose();

    // Post the application data with JWT in headers
    axios.post('http://localhost:8082/api/applications/create-application', applicationData, {
      headers: {
        'Authorization': `Bearer ${user.token}`, // Assuming user.token contains the JWT
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        console.log('Application submitted:', response.data);
        // Handle success response
      })
      .catch(error => {
        console.error('Error submitting application:', error);
        // Handle error response
      });
  };

  return (
    <div className="modal">
      <form className="job-application" onSubmit={handleSubmit}>
        <h3>Job Application</h3>

        <label>Cover Letter:</label>
        <textarea
          placeholder="Write your cover letter here"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        ></textarea>

        <label>Resume:</label>
        <textarea
          placeholder="Paste your resume here"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        ></textarea>

        <button type="submit">Submit Application</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default JobApplication;
