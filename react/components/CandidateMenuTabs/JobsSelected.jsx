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
          (job) => job.selectedCandidateId === user.id
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
      {selectedJobs.length > 0 ? (
        selectedJobs.map((job) => (
          <div key={job.id}>
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

export default JobsSelected;
