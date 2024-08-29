import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { AuthContext } from '../../context/AuthContext';

const NavBar = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { logout } = useLogout();

    const handleClick = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="navbar-header">
            <div className="navbar-container">
                <div className="navbar-logo">
                    {!user ? (
                        <Link to="/">
                            <h4>Talent Manager</h4>
                        </Link>
                    ) : (
                        <Link to="/home">
                            <h4>Talent Manager</h4>
                        </Link>
                    )}
                </div>
                <nav className="navbar-links">
                    {!user ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                    ) : (
                        <>
                            <Link onClick={handleClick}>Log Out</Link>
                            <Link to="/myprofilepage">My Profile</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default NavBar;
