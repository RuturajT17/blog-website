import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.getAll();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new blog
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content required' });
    }
    const id = await Blog.create(title, content);
    res.status(201).json({ id, title, content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;