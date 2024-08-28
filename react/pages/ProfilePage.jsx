import React from "react";
import { AuthContext } from '../context/AuthContext';
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8084/api/users/', {
          headers: {
            Authorization: `Bearer ${user.token}`, // Use token from user object
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user.token]);

  if (!userData) return <div>Loading...</div>;

const styles = {
    card: {
      backgroundColor: 'white',
      border: '1px solid black',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '16px',
    },
  };

  return (
    <>
    <div className="card" style={styles.card}>
      <h1>Welcome, {userData.firstName}!</h1>
      <p><strong>Full Name:</strong> {userData.firstName} {userData.lastName}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Email/Username:</strong> {userData.email}</p>
      <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
      <p><strong>Age:</strong> {userData.age} </p>
      </div>
      </>
  );
};

export default ProfilePage