import React, { useState, useEffect } from 'react';
import HiringManagerApproval from './HiringManagerApproval';

const AdminDashboard = () => {
    const [candidates, setCandidates] = useState([]);
    const [hiringManagers, setHiringManagers] = useState([]);

    // Mock fetching data (replace with actual API calls)
    useEffect(() => {
        // Fetch candidates
        const fetchedCandidates = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
        setCandidates(fetchedCandidates);

        // Fetch hiring managers (some may be pending approval)
        const fetchedHiringManagers = [
            { id: 1, name: 'Hiring Manager 1', approved: true },
            { id: 2, name: 'Hiring Manager 2', approved: false }
        ];
        setHiringManagers(fetchedHiringManagers);
    }, []);

    // Function to handle approval of hiring managers
    const handleApprove = (id) => {
        setHiringManagers(hiringManagers.map(manager =>
            manager.id === id ? { ...manager, approved: true } : manager
        ));
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Number of Candidates: {candidates.length}</h2>
            </div>
            <div>
                <h2>Number of Hiring Managers: {hiringManagers.filter(manager => manager.approved).length}</h2>
            </div>
            <HiringManagerApproval managers={hiringManagers} onApprove={handleApprove} />
        </div>
    );
};

export default AdminDashboard;
