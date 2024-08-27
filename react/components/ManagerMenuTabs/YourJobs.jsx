import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import JobCard from "../FeedCard/JobCard";

const YourJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/jobs/manager-jobs", {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching your jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [user.token]);

  return (
    <div>
      <h2>Your Jobs</h2>
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} fetchData={fetchJobs} />)
      ) : (
        <p>No open jobs found.</p>
      )}
    </div>
  );
};

export default YourJobs;
