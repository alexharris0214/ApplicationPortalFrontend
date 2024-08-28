import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import JobFeed from '../components/FeedCard/JobFeed';
import CreateJobModal from '../components/PostModal/CreateJobModal';
import { AuthContext } from '../context/AuthContext';
import MenuTabs from '../components/MenuTab/MenuTab';
import MenuTabCandidate from '../components/MenuTab/MenuTabCandidate';

const HomePage = () => {
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(AuthContext);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8081/api/jobs/open-jobs");
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="homepage-container">
            <p className="welcome-message">You are on the home page after logging in! Welcome {user.role}</p>

            <div className="job-board">
                <h1>Job Board</h1>
                {user && user.role === 'RECRUITER' && (
                    <button className="style-button" onClick={openModal}>Create New Job</button>
                )}
                <CreateJobModal isOpen={isModalOpen} onClose={closeModal} />
            </div>

            {user && user.role === 'CANDIDATE' && (
                <div className="menu-tab-container">
                    <MenuTabCandidate />
                </div>
            )}

            {user && user.role === 'RECRUITER' && (
                <div className="menu-tab-container">
                    <MenuTabs fetchData={fetchData} />
                </div>
            )}
        </div>
    );
};

export default HomePage;
