import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import JobFeed from '../components/FeedCard/JobFeed';
import CreateJobModal from '../components/PostModal/CreateJobModal'; // Updated import
import { AuthContext } from '../context/AuthContext';
import MenuTabs from '../components/MenuTab/MenuTab';
import MenuTabCandidate from '../components/MenuTab/MenuTabCandidate';

const HomePage = () => {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [loggedInUser, setLoggedInUser] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/jobs/open-jobs");

      const response2 = await axios.get("http://localhost:8084/api/users/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      })

      setData(response.data);
      setLoggedInUser(response2.data);
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
    console.log(loggedInUser)
  }, []);
  
  return (
    <div>
      <p>Welcome {loggedInUser.firstName}</p>
      <div style={{ padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1>Job Board</h1>
        {user && user.role === 'RECRUITER' && (
         <button className='style-button' onClick={openModal}>Create New Job</button>
       )}
       <CreateJobModal isOpen={isModalOpen} onClose={closeModal} /> 
        
      </div>

      {/* <section className='job-feed'>
          <JobFeed />
        </section> */}
      {user && user.role === 'CANDIDATE' ? (
        <MenuTabCandidate/>
      ) : <></>}
      {
      (user && user.role === 'RECRUITER' ?
        <MenuTabs fetchData={fetchData} />:<></>
      )}
      {/* <section className='job-feed'>
        <JobFeed/>
      </section> */}
    </div>
  );
};

export default HomePage;
