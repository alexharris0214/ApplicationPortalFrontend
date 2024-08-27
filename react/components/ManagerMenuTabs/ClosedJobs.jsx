import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import JobCard from "../FeedCard/JobCard";

const ClosedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/jobs/closed-jobs", {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching closed jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [user.token]);

  return (
    <div>
      <h2>Closed Jobs</h2>
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} fetchData={fetchJobs} />)
      ) : (
        <p>No closed jobs found.</p>
      )}
    </div>
  );
};

export default ClosedJobs;
