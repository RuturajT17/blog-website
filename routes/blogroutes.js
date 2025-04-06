const express = require('express');
const Blog = require('../models/Blog');
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.getAll();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Handle likes
router.post('/:id/like', authenticate, async (req, res) => {
  try {
    const count = await Blog.toggleLike(req.params.id, req.user.id);
    res.json({ newLikeCount: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process like' });
  }
});

module.exports = router;