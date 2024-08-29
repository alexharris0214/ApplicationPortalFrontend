import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const JobsApplied = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/jobs/open-jobs", {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
        setAppliedJobs(response.data);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchAppliedJobs();
  }, [user.token]);

  return (
    <div>
      <h2>Jobs Applied</h2>
      {appliedJobs.length > 0 ? (
        appliedJobs.map((job) => (
          <div key={job.id} style={jobCardStyles}>
            <h3>{job.jobTitle}</h3>
            <p>{job.jobDescription}</p>
            <p><strong>Date Applied:</strong> {new Date(job.dateApplied).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>You haven't applied to any jobs yet.</p>
      )}
    </div>
  );
};

const jobCardStyles = {
  padding: "15px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  marginBottom: "10px",
  backgroundColor: "#f9f9f9",
};

export default JobsApplied;
