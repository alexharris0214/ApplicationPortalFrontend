import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './JobCard'; // Import the JobCard component
import { jobData } from './JobData'; // Import the job data

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/jobs/open-jobs");
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="job-feed">
      {/* Map over the fetched jobs */}
      {jobs.map((job) => (
        <JobCard key={job.id || job.listingTitle} job={job} /> // Use listingTitle as fallback for key
      ))}
    </div>
  );
};

export default JobFeed;
