import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const ManagerJobCard = ({ job }) => {
    const navigate = useNavigate();

    function handleDelete() {
        console.log("Deleting job");
    }

    function handleEdit() {
        console.log(job.id);
        navigate(`/manager/edit/${job.id}`);
    }

    function viewApps() {
        console.log(job);
    }

  return (
    <div className="card" style={styles.card}>
      {job.listingTitle && <h3>{job.listingTitle}</h3>}
      {job.jobTitle && <h3>{job.jobTitle}</h3>}
      {job.managerId && <p><strong>Manager ID:</strong> {job.managerId}</p>}
      {job.dateListed && <p><strong>Date Listed:</strong> {job.dateListed}</p>}
      {job.dateClosed && <p><strong>Date Closed:</strong> {job.dateClosed}</p>}
      {job.openStatus && <p><strong>Status:</strong> {job.openStatus}</p>}
      {job.jobDescription && <p><strong>Description:</strong> {job.jobDescription}</p>}
        <button onClick={handleDelete} className="button" style={styles.button}>
            <strong>Delete Job Posting</strong></button>
        <button onClick={handleEdit} className='button' style={styles.button}><strong>Edit Job Postings</strong></button>
        <button onClick={viewApps} className='button' style={styles.button}><strong>View Applications</strong></button>
    </div>
  );
};
const styles = {
  card: {
      backgroundColor: 'white',
      border: '1px solid black',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '16px',
  },
  button: {
    backgroundColor: "white",
    border: '1px solid black',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px 32px'
  }
};

export default ManagerJobCard;