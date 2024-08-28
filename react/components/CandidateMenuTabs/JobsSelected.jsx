import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const JobsSelected = () => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSelectedJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/jobs/closed-jobs", {
          headers: {
            "Authorization": `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
        const filteredJobs = response.data.filter(
          (job) => job.selectedCandidateId === user.userId
        );
        setSelectedJobs(filteredJobs);
      } catch (error) {
        console.error("Error fetching selected jobs:", error);
      }
    };

    fetchSelectedJobs();
  }, [user.id, user.token]);

  return (
    <div>
      <h2>Jobs Selected</h2>
      <p><strong>If you are selected for a job the HR will reach out to you in due time</strong></p>
      {selectedJobs.length > 0 ? (
        selectedJobs.map((job) => (
          <div key={job.id} style={jobCardStyles}>
            <h3>{job.jobTitle}</h3>
            <p>{job.jobDescription}</p>
            <p>
              <strong>Date Selected:</strong>{" "}
              {new Date(job.dateClosed).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p>No jobs where you were selected as a candidate.</p>
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

export default JobsSelected;
