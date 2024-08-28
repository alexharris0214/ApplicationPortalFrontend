import React from "react";
import { AuthContext } from '../context/AuthContext';
import { useContext } from "react";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/', {
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

  return (
    <div>
      <h1>Welcome, {userData.username}!</h1>
      <p>Role: {user.role}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};
}

export default ProfilePage