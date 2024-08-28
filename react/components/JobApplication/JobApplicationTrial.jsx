import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const JobApplicationTrial = ({ job, onClose }) => {
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState(null); // Use to store the file
  const { user } = useContext(AuthContext);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to apply.');
      return;
    }

    let uploadedFileUrl = ''; // Local variable for the resume URL

    if (resumeFile) {
      try {
        // Get pre-signed URL from the backend
        console.log('Requesting pre-signed URL...');
        const response = await axios.get('http://localhost:8083/api/resume/upload-presigned-url', {
          headers: {
            'Authorization': `Bearer ${user.token}`, 
          },
        });
        console.log('Received pre-signed URL:', response.data);
        const presignedUrl = response.data;

        // Upload the file to S3 using the pre-signed URL
        console.log('Uploading resume to S3...');
        await axios.put(presignedUrl, resumeFile, {
          headers: {
            'Content-Type': "multipart/form-data",
          },
        });
        console.log('Resume uploaded to S3 successfully.');

        // Extract the file URL from the presigned URL (depends on how your backend generates it)
        uploadedFileUrl = presignedUrl.split('?')[0];
        console.log('Uploaded file URL:', uploadedFileUrl);

      } catch (error) {
        console.error('Error uploading file:', error);
        return;
      }
    }

    const applicationData = {
      userId: user.userId,
      jobId: job.id,
      dateApplied: new Date().toISOString(),
      coverLetter,
      resume: uploadedFileUrl, // Use the local variable for the resume URL
      open: true,
    };

    console.log('Application data to be submitted:', JSON.stringify(applicationData, null, 2));

    // Post the application data with JWT in headers
    try {
      console.log('Submitting application data...');
      const response = await axios.post(
        'http://localhost:8082/api/applications/create-application',
        applicationData,
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Application submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting application:', error);
    }

    onClose(); // Close the modal after submission
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

        <label>Resume (PDF or DOC):</label>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />

        <button type="submit">Submit Application</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default JobApplicationTrial;
