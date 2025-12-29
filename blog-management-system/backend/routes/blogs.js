const express = require('express');
const multer = require('multer');
const path = require('path');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Get all blogs (public)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single blog (public)
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create blog (authenticated)
router.post('/', auth, upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const blog = new Blog({ title, content, imagePath, author: req.user._id });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update blog (authenticated, own only)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    if (imagePath) blog.imagePath = imagePath;
    blog.updatedAt = Date.now();
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete blog (authenticated, own only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    if (blog.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    await blog.remove();
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;