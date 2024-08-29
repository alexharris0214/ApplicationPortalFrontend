import React from 'react';

const HiringManagerApproval = ({ managers, onApprove, onDeny }) => {
    return (
        <div className="approval-section">
            <h2 className="section-title">Pending Hiring Manager Approvals</h2>
            <div className="approval-cards">
                {managers.filter(manager => !manager.approved).map(manager => (
                    <div key={manager.id} className="approval-card">
                        <h3>{manager.name}</h3>
                        <p><strong>Email:</strong> {manager.email}</p>
                        <p><strong>Company:</strong> {manager.company}</p>
                        <div className="approval-buttons">
                            <button className="button approve-btn" onClick={() => onApprove(manager.id)}>
                                Approve
                            </button>
                            <button className="button deny-btn" onClick={() => onDeny(manager.id)}>
                                Deny
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HiringManagerApproval;
