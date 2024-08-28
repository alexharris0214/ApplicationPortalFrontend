import React from "react";
import { AuthContext } from '../context/AuthContext';
import { useContext } from "react";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <>
        This is the profile page
        </>
        
    )
}

export default ProfilePage