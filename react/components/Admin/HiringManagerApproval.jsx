import React from 'react';

const HiringManagerApproval = ({ managers, onApprove }) => {
    return (
        <div>
            <h3>Pending Hiring Manager Approvals</h3>
            <ul>
                {managers.filter(manager => !manager.approved).map(manager => (
                    <li key={manager.id}>
                        {manager.name}
                        <button onClick={() => onApprove(manager.id)}>Approve</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HiringManagerApproval;
