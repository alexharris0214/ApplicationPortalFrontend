import React from 'react';


const JobCard = ({ job }) => {
  return (
    <div className="card" style={styles.card}>
      {job.listingTitle && <h3>{job.listingTitle}</h3>}
      {job.jobTitle && <h3>{job.jobTitle}</h3>}
      {job.managerId && <p><strong>Manager ID:</strong> {job.managerId}</p>}
      {job.dateListed && <p><strong>Date Listed:</strong> {job.dateListed}</p>}
      {job.dateClosed && <p><strong>Date Closed:</strong> {job.dateClosed}</p>}
      {job.openStatus && <p><strong>Status:</strong> {job.openStatus}</p>}
      {job.jobDescription && <p><strong>Description:</strong> {job.jobDescription}</p>}
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
};

export default JobCard;
