import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import FeedCard from '../components/FeedCard/FeedCard';
import PostModal from '../components/PostModal/PostModal';
import { AuthContext } from '../context/AuthContext';
import JobFeed from '../components/FeedCard/JobFeed';
import ManagerJobFeed from '../components/FeedCard/ManagerJobFeed';

const JobPostingEditor = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async
    })
    return <>
    Hello!
    </>
}

export default JobPostingEditor;