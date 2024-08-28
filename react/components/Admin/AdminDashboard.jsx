import React, { useState, useEffect } from 'react';
import useAuthContext from '../../hooks/useAuthContext';

const AdminDashboard = () => {
    const [candidates, setCandidates] = useState([]);
    const { user } = useAuthContext();
    const [recruiters, setRecruiters] = useState([]);
    const [view, setView] = useState('dashboard'); // Controls which part of the dashboard is being viewed
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        age: '',
        password: '',
        role: 'RECRUITER'
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8084/api/users/get-all', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const data = await response.json();
                setCandidates(data.filter(user => user.role === 'CANDIDATE'));
                setRecruiters(data.filter(user => user.role === 'RECRUITER'));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recruiterData = {
            ...formData,
            role: 'RECRUITER',
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(recruiterData),
            });

            if (response.ok) {
                setMessage('Recruiter account created successfully!');
                setRecruiters([...recruiters, recruiterData]); // Add new recruiter to the list
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    address: '',
                    age: '',
                    password: '',
                });
            } else {
                setMessage('Failed to create recruiter account. Please try again.');
            }
        } catch (error) {
            console.error('Error creating recruiter account:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    const renderTable = (data, columns) => {
        return (
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.firstName} {item.lastName}</td>
                            <td>{item.email}</td>
                            {item.company && <td>{item.company}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const renderDashboard = () => (
        <>
            <div className="dashboard-stats">
                <div className="stat-card" onClick={() => setView('candidates')}>
                    <h2>Number of Candidates</h2>
                    <p>{candidates.length}</p>
                </div>
                <div className="stat-card" onClick={() => setView('recruiters')}>
                    <h2>Recruiter Accounts</h2>
                    <p>{recruiters.length}</p>
                </div>
            </div>

            <div className="create-recruiter-section">
                <h2>Create Recruiter Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Create Recruiter Account</button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </>
    );

    return (
        <div className="admin-dashboard">
            <h1 className="dashboard-title">Admin Dashboard</h1>

            {view === 'dashboard' && renderDashboard()}

            {view === 'candidates' && (
                <div>
                    <h2>Candidates</h2>
                    <button onClick={() => setView('dashboard')}>Back to Dashboard</button>
                    {renderTable(candidates, ['ID', 'Name', 'Email'])}
                </div>
            )}

            {view === 'recruiters' && (
                <div>
                    <h2>Recruiter Accounts</h2>
                    <button onClick={() => setView('dashboard')}>Back to Dashboard</button>
                    {renderTable(recruiters, ['ID', 'Name', 'Email'])}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
