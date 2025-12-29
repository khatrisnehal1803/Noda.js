import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';  
import Auth from './components/Auth.jsx';
import BlogList from './components/BlogList.jsx';
import BlogForm from './components/BlogForm.jsx';
import API from './api.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in (simple check)
    API.get('/blogs').then(() => setIsAuthenticated(true)).catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/create" element={isAuthenticated ? <BlogForm /> : <Auth setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/edit/:id" element={isAuthenticated ? <BlogForm /> : <Auth setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;