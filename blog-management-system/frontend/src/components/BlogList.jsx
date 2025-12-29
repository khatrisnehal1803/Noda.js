import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api.js';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get('/blogs').then(res => setBlogs(res.data));
  }, []);

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          {blog.imagePath && <img src={` http://localhost:5177/${blog.imagePath}`} alt="Blog" />}
          <p>By: {blog.author.name}</p>
          <Link to={`/edit/${blog._id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;