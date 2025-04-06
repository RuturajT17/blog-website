import express from 'express';
import db from '../config/db.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Signup route
router.post('/', async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  try {
    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Username, email and password are required' 
      });
    }

    // Check if user already exists
    const [existingUser] = await db.query(
      'SELECT user_id FROM users WHERE username = ? OR email = ?', 
      [username, email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ 
        success: false,
        message: 'Username or email already exists' 
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    await db.query(
      `INSERT INTO users 
       (username, email, password, first_name, last_name) 
       VALUES (?, ?, ?, ?, ?)`,
      [username, email, hashedPassword, firstName, lastName]
    );

    res.status(201).json({ 
      success: true,
      message: 'User created successfully' 
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
});

export default router;