import React, { useState, useContext } from "react";
import JobApplicationTrial from "../JobApplication/JobApplicationTrial";
import EditJobModal from "../PostModal/EditJobModal";
import ApplicantFeed from "../Applications/ApplicantFeed";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const JobCard = ({ job, fetchData, fetchAppliedJobs ,appliedJobIds }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isApplicantFeedOpen, setIsApplicantFeedOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchAppliedJobs();
    fetchData();
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    fetchData(); // Refresh job list after editing
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8081/api/jobs/delete-job/${job.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchData(); // Refresh job list after deleting
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const viewApps = () => {
    setIsApplicantFeedOpen(true);
  };

  const handleCloseApplicantFeed = () => {
    setIsApplicantFeedOpen(false);
  };

  return (
    <div className="card" style={styles.card}>
      {/* {job.id && <h3>Job ID: {job.id}</h3>} */}
      {job.listingTitle && <h3>{job.listingTitle}</h3>}
      {job.jobTitle && (
        <h3>
          <strong>Position Title:</strong> {job.jobTitle}
        </h3>
      )}
      {/* {job.managerId && <p><strong>Manager ID:</strong> {job.managerId}</p>} */}
      {job.dateListed && (
        <p>
          <strong>Date Listed:</strong>{" "}
          {new Date(job.dateListed).toLocaleDateString()}
        </p>
      )}
      {job.dateClosed && (
        <p>
          <strong>Date Closed:</strong>{" "}
          {job.dateClosed
            ? new Date(job.dateClosed).toLocaleDateString()
            : "N/A"}
        </p>
      )}
      {job.positionCategory && (
        <p>
          <strong>Category:</strong> {job.positionCategory}
        </p>
      )}
      {job.openStatus && (
        <p>
          <strong>Status:</strong> {job.openStatus ? "Open" : "Closed"}
        </p>
      )}
      {job.state && (
        <p>
          <strong>State:</strong> {job.state}
        </p>
      )}
      {job.city && (
        <p>
          <strong>City:</strong> {job.city}
        </p>
      )}
      {job.jobDescription && (
        <p>
          <strong>Description:</strong> {job.jobDescription}
        </p>
      )}

      {user && user.role === "RECRUITER" && user.userId === job.managerId ? (
        <div>
          <button onClick={handleDelete} className="style-button">
            Delete Job Posting
          </button>
          <button onClick={handleEditClick} className="style-button">
            Edit Job Postings
          </button>
          <button onClick={viewApps} className="style-button">
            View Applications
          </button>
        </div>
      ) : (
        <></>
      )}

      {user &&
        user.role === "CANDIDATE" &&
        (appliedJobIds.includes(job.id) ? (
          <p>Already Applied</p>
        ) : (
          <button onClick={handleApplyClick} className="style-button">
            Apply
          </button>
        ))}

      {isModalOpen && (
        <JobApplicationTrial job={job} onClose={handleCloseModal} />
      )}

      {isEditModalOpen && (
        <EditJobModal
          isOpen={isEditModalOpen}
          job={job}
          onClose={handleCloseEditModal}
        />
      )}



      {isApplicantFeedOpen && (
        <div className="modal" style={modalStyles}>
          <ApplicantFeed jobId={job.id} onClose={handleCloseApplicantFeed} />
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "white",
    border: "1px solid black",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    margin: "12px",
    borderRadius: "12px",
  },
};

const modalStyles = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
};

export default JobCard;