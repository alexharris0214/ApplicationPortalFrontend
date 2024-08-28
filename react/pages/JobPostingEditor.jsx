import React, { useState, useEffect ,useContext} from 'react';
// import axios from 'axios';
// import FeedCard from '../components/FeedCard/FeedCard';
// import PostModal from '../components/PostModal/PostModal';
// import { AuthContext } from '../context/AuthContext';
// import JobFeed from '../components/FeedCard/JobFeed';
// import ManagerJobFeed from '../components/FeedCard/ManagerJobFeed';
import { useParams } from 'react-router-dom';

const JobPostingEditor = () => {
    const { jobId } = useParams();

    // const [jobs, setJobs] = useState([]);

    // useEffect(() => {
    //     const fetchJobs = async
    // })
    function handleSubmit () {
        return <h1>Hello</h1>
    }
    return <div className='div' style={styles.div}>
        <h1>Edit Job Posting</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Listing Title: 
                <input type="text" />
            </label>
            
            <label>
                Job Title: 
                <input type="text" value/>
            </label>

            <label>
                Job Description: 
                <input type="text" />
            </label>

            <label>
                Availability Status: 
                <input type="text" />
            </label>
            <button type="submit">Update & Save</button>
        </form>
    </div>
}
const styles = {
    div: {
        backgroundColor: 'white',
        border: '1px solid black',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '16px',
    },
  };

export default JobPostingEditor;