import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
const JobApplication = ({ job, onClose }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState('');
  const { user } = useContext(AuthContext); // Get the userId from context
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Checking user context from job app", user);
    let userId = user.userId;

    const applicationData = {
      userId,
      jobId: job.jobId, 
      dateApplied: new Date(),
      coverLetter,
      resume,
      open: true,
    };

    console.log(JSON.stringify(applicationData, null, 2));

    // Close the modal after submission
    onClose();

    // Future implementation: Replace with actual API call
    // axios.post('your-api-url-here', applicationData)
    //   .then(response => console.log(response))
    //   .catch(error => console.error(error));
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
