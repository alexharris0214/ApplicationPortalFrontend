import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import FeedCard from '../components/FeedCard/FeedCard';
import PostModal from '../components/PostModal/PostModal';
import { AuthContext } from '../context/AuthContext';
import JobFeed from '../components/FeedCard/JobFeed';
const HomePage = () => {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/jobs");
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Open the modal
  const openModal = () => setIsModalOpen(true);

  // Close the modal and refetch data
  const closeModal = () => {
    setIsModalOpen(false);
    fetchData();  // Refetch data when modal is closed
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p>You are on the home page after logging in! Welcome Candidate/Hiring Manager</p>
      <div style={{ padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h1>Job Board</h1>
        <button className='style-button' onClick={openModal}>Create New Post</button>
        <PostModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <section className='job-feed'>
       <JobFeed/>
      </section>
    </div>
  );
};

export default HomePage;
