import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const JobsApplied = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        // Step 1: Fetch applications for the candidate
        const applicationsResponse = await axios.get(
          `http://localhost:8082/api/applications/get-for-candidate/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const applications = applicationsResponse.data;

        // Step 2: Fetch job details for each jobId
        const jobDetailsPromises = applications.map((application) =>
          axios.get(`http://localhost:8081/api/jobs/${application.jobId}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          })
        );

        const jobDetailsResponses = await Promise.all(jobDetailsPromises);

        // Step 3: Store job details in state
        const jobDetails = jobDetailsResponses.map((response) => response.data);
        setAppliedJobs(jobDetails);

      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchAppliedJobs();
  }, [user.userId, user.token]);

  return (
    <div>
      <h2>Jobs Applied</h2>
      {appliedJobs.length > 0 ? (
        appliedJobs.map((job) => (
          <div key={job.id} style={jobCardStyles}>
            <h3>{job.jobTitle}</h3>
            <p><strong>Description: </strong>{job.jobDescription}</p>
            {/* <p><strong>Date Applied:</strong> {new Date(job.dateApplied).toLocaleDateString()}</p> */}
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
