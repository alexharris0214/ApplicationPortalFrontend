import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './JobCard'; // Import the JobCard component
import { jobData } from './JobData'; // Import the job data


const JobFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState('');


  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/jobs/open-jobs");
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const filteredJobs = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(jobTitle.toLowerCase())
  );


  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="job-feed">
      {/* Search by Job Title */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Job Title"
          value={jobTitle}
          onChange={handleJobTitleChange}
        />
      </div>


      {/* Map over the fetched jobs */}
      {filteredJobs.map((job) => (
        <JobCard key={job.id || job.listingTitle} job={job} fetchData={fetchData}/> // Use listingTitle as fallback for key
      ))}
    </div>
  );
};


export default JobFeed;
