import React, {useState} from 'react';
import JobCard from './JobCard'; // Import the JobCard component
import { jobData } from './JobData'; // Import the job data

const JobFeed = () => {

  const [jobs, setJobs] = useState([]); // No need for useEffect here

  // Use the imported jobData directly
  // (Comment about API endpoint fetching remains)
  // useEffect(() => {
  //   // Replace with your API endpoint
  //   axios.get('https://api.example.com/jobs')
  //     .then(response => setJobs(response.data))
  //     .catch(error => console.error('Error fetching jobs:', error));
  // }, []);

  return (
    <div className="job-feed">
      {/* Map over the imported jobData */}
      {jobData.map(job => (
        <JobCard key={job.id || job.listingTitle} job={job} /> // Use listingTitle as fallback for key
      ))}
    </div>
  );
};

export default JobFeed;