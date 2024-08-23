// JobFeed.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './JobCard'; // Import the JobCard component


const JobFeed = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint
    axios.get('https://api.example.com/jobs')
      .then(response => setJobs(response.data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <div className="job-feed">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobFeed;
