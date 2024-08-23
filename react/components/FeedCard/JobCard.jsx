import React from 'react';


const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      {job.listingTitle && <h2>{job.listingTitle}</h2>}
      {job.jobTitle && <h3>{job.jobTitle}</h3>}
      {job.managerId && <p><strong>Manager ID:</strong> {job.managerId}</p>}
      {job.dateListed && <p><strong>Date Listed:</strong> {job.dateListed}</p>}
      {job.dateClosed && <p><strong>Date Closed:</strong> {job.dateClosed}</p>}
      {job.openStatus && <p><strong>Status:</strong> {job.openStatus}</p>}
      {job.jobDescription && <p><strong>Description:</strong> {job.jobDescription}</p>}
    </div>
  );
};

export default JobCard;
