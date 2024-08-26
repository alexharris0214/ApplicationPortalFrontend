import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ManagerJobCard from './ManagerJobCard'; // Import the JobCard component
import { jobData } from './JobData'; // Import the job data

const ManagerJobFeed = () => {

  const [jobs, setJobs] = useState([]); // No need for useEffect here

//   useEffect(() => {
//     // Replace with your API endpoint
//     axios.get('https://localhost:8081/api/jobs/manager-jobs')
//       .then(response => setJobs(response.data))
//       .catch(error => console.error('Error fetching jobs:', error));
//   }, []);

  return (
    <div className="job-feed">
      {/* Map over the imported jobData */}
      {jobData.map(job => (
        <ManagerJobCard key={job.id || job.listingTitle} job={job} /> // Use listingTitle as fallback for key
      ))}
    </div>
  );
};

export default ManagerJobFeed;