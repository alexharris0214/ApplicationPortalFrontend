import React, { useState, useEffect,useContext} from 'react';
import axios from 'axios';
import JobCard from './JobCard'; // Import the JobCard component
//import { jobData } from './JobData'; // Import the job data
import StateDropdown from '../JobApplication/StateDropDown';
import { AuthContext } from "../../context/AuthContext";

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [jobState, setJobState] = useState(''); 
  const [jobCategory, setJobCategory] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const { user } = useContext(AuthContext);
  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8082/api/applications/get-for-candidate/${user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const appliedJobIds = response.data.map((application) => application.jobId);
      setAppliedJobIds(appliedJobIds);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const categories = [
    {"name": "Developer", "abbreviation": "DEVELOPER"},
    {"name": "Sales", "abbreviation": "SALES"},
    {"name": "Human Resources", "abbreviation": "HR"},
    {"name": "Operations", "abbreviation": "OPERATIONS"},
  ]
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/jobs/open-jobs");
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleCategoryTitleChange = (e) => {
    setJobCategory(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    let filtered = jobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(jobTitle.toLowerCase())
    );
    if(jobState!= ''){
      filtered = filtered.filter((job) =>  
        job.state == jobState
      );
    }
    console.log(jobCategory)
    if(jobCategory != ''){
      filtered = filtered.filter((job) => 
        job.positionCategory == jobCategory
      )
    }
    setFilteredJobs(filtered);
  };

  useEffect(() => {
    fetchData();
    if(user){
    fetchAppliedJobs();
    }
  }, []);


  return (
<div className="job-feed">
    <form onSubmit={handleSearchSubmit}>
        <div className="search-container">
            <input
                type="text"
                placeholder="Search by Job Title"
                value={jobTitle}
                onChange={handleJobTitleChange}
                className="search-input"
                style={{marginTop:20, maxWidth:"20%"}}
            />
            <StateDropdown
                setStateSetter={setJobState}
                placeholder="Search By State"
                className="search-dropdown"
            />
            <div style={{maxWidth:"20%"}}>

            <select className="state-select" name="category" onChange={handleCategoryTitleChange}>
              <option value="">Search By Category</option>
              {categories.map((category) => (
                <option key={category.abbreviation} value={category.abbreviation}>
                  {category.name}
                </option>
              ))}
            </select> 
            </div>
            <button type="submit" className="search-button">Search</button>
        </div>
    </form>

      {filteredJobs.map((job) => (
        <JobCard key={job.id || job.listingTitle} job={job} fetchData={fetchData} fetchAppliedJobs={fetchAppliedJobs} appliedJobIds={appliedJobIds}/>
      ))}
    </div>
  );
};


export default JobFeed;
