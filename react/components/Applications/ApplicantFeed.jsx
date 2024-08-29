import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ApplicantCard from "./ApplicantCard";
import { AuthContext } from "../../context/AuthContext";

const ApplicantFeed = ({ jobId, onClose }) => {
  const [applicants, setApplicants] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchJobAndApplicants = async () => {
      try {
        // Fetch job data to get the selectedCandidateId
        const jobResponse = await axios.get(`http://localhost:8081/api/jobs/${jobId}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
        setSelectedCandidateId(jobResponse.data?jobResponse.data.selectedCandidateId:null);

        // Fetch applicants
        const applicantsResponse = await axios.get(
          `http://localhost:8082/api/applications/get-for-job/${jobId}`,
          {
            headers: {
              'Authorization': `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setApplicants(applicantsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchJobAndApplicants();
  }, [jobId, user.token]);

  const handleSelectCandidate = async (candidateId) => {
    try {
      // Select the candidate
      await axios.patch(
        'http://localhost:8081/api/jobs/select-candidate',
        { jobId, candidateId },
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Close the job
      await axios.patch(
        'http://localhost:8081/api/jobs/job-closed',
        { jobId },
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update state to reflect the changes
      setSelectedCandidateId(candidateId);

    } catch (error) {
      console.error('Error selecting candidate or closing job:', error);
    }
  };

  const handleUnselectCandidate = async () => {
    try {
      // Reopen the job
      await axios.patch(
        'http://localhost:8081/api/jobs/job-open',
        { jobId },
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Unselect the candidate
      await axios.patch(
        'http://localhost:8081/api/jobs/select-candidate',
        { jobId, candidateId: null },
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update state to reflect the changes
      setSelectedCandidateId(null);

    } catch (error) {
      console.error('Error unselecting candidate or reopening job:', error);
    }
  };

  return (
    <div className="applicant-feed" style={feedStyles}>
      {applicants.length > 0 ? (
        applicants.map((applicant) => (
          <ApplicantCard
            key={applicant.userId}
            applicant={applicant}
            isSelected={selectedCandidateId === applicant.userId}
            onSelect={handleSelectCandidate}
            onUnselect={handleUnselectCandidate}
          />
        ))
      ) : (
        <p>No applicants found.</p>
      )}
      <button onClick={onClose} className="style-button">
        <strong>Close</strong>
      </button>
    </div>
  );
};

const feedStyles = {
  backgroundColor: "white",
  border: "1px solid black",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "16px",
  maxHeight: "80vh",
  overflowY: "auto",
};

export default ApplicantFeed;
