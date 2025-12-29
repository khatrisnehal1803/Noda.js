import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api.js';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (id) {
      API.get(`/blogs/${id}`).then(res => setForm({ title: res.data.title, content: res.data.content }));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    if (image) formData.append('image', image);

    try {
      if (id) {
        await API.put(`/blogs/${id}`, formData);
      } else {
        await API.post('/blogs', formData);
      }
      navigate('/');
    } catch (err) {
      // Fixed: Check if err.response exists
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert('An error occurred. Please check your connection or try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">{id ? 'Update' : 'Create'} Blog</button>
    </form>
  );
};

export default BlogForm;