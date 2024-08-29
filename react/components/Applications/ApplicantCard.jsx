import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import { AuthContext } from '../../context/AuthContext';

const ApplicantCard = ({ applicant, isSelected, onSelect, onUnselect }) => {

  const {user} = useAuthContext(AuthContext)
  const [userData, setUserData] = useState({})
  const handleSelect = () => {
    onSelect(applicant.userId);
  };
  useEffect(() => {
    getUserInfo(user.userId)
  }, [user])
  const handleUnselect = () => {
    onUnselect();
  };

  const getUserInfo = async (userId) => {
      const response = await axios.get(`http://localhost:8084/api/users/id/${userId}`, {
        headers:{
          "Authorization": `Bearer ${user.token}`,
          "content-type":"application/json"
        }
      })
      console.log(response.data)
      setUserData(response.data)

  }

  return (
    <div className="applicant-card" style={styles.card}>
      <p><strong>Name:</strong> {`${userData.firstName}, ${userData.lastName}`}</p>
      <p><strong>Cover Letter:</strong> {applicant.coverLetter}</p>
      <p><strong>Resume:</strong></p>
      <a href={applicant.resume} download target="_blank" rel="noopener noreferrer">
        <button className="style-button">
          <strong>Download Resume</strong>
        </button>
      </a>
      {isSelected ? (
        <button onClick={handleUnselect} className="style-button">
          <strong>Unselect Candidate</strong>
        </button>
      ) : (
        <button onClick={handleSelect} className="style-button">
          <strong>Select Candidate</strong>
        </button>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    border: '1px solid black',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    marginBottom: '16px',
  },
};

export default ApplicantCard;
