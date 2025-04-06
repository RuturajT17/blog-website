import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import connection from './config/db.js';
import blogRoutes from './routes/blogroutes.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

import cors from 'cors';
app.use(cors()); // Allows requests from your frontend

// Routes
app.use('/api/blogs', blogRoutes);

// Database test endpoint
app.get('/api/db-check', async (req, res) => {
  try {
    const [rows] = await connection.promise().query('SELECT 1+1 AS result');
    res.json({ 
      status: 'Database connected successfully',
      result: rows[0].result
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Database connection failed',
      error: error.message 
    });
  }
});

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'user-home.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test database connection: http://localhost:${PORT}/api/db-check`);
});