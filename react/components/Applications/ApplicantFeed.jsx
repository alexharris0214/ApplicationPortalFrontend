import React, { useState, useEffect ,useContext} from "react";
import axios from "axios";
import ApplicantCard from "./ApplicantCard";
import { AuthContext } from "../../context/AuthContext";

const ApplicantFeed = ({ jobId, onClose }) => {
  const [applicants, setApplicants] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8082/api/applications/get-for-job/${jobId}`,
          {
            headers: {
              'Authorization': `Bearer ${user.token}`, // Assuming user.token contains the JWT
              "Content-Type": "application/json",
            },
          }
        );
        setApplicants(response.data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [jobId]);

  return (
    <div className="applicant-feed" style={feedStyles}>
      <button onClick={onClose} className="style-button">
        <strong>Close</strong>
      </button>
      {applicants.length > 0 ? (
        applicants.map((applicant) => (
          <ApplicantCard
            key={applicant.id}
            applicant={applicant}
            onSelect={(id) => console.log(`Selected Applicant ID: ${id}`)}
          />
        ))
      ) : (
        <p>No applicants found.</p>
      )}
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
