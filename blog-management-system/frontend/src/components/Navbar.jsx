import React from 'react';
import { Link } from 'react-router-dom';
import API from '../api.js';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleLogout = async () => {
    await API.post('/auth/logout');
    setIsAuthenticated(false);
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/create">Create Blog</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/auth">Login/Register</Link>
      )}
    </nav>
  );
};

export default Navbar;