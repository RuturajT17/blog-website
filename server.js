import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import db from './config/db.js';
import blogRoutes from './routes/blogroutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Static files (CSS/JS/Images)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/blogs', blogRoutes);

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'user-home.html'));
});

// Error handling
app.use((req, res) => res.status(404).send('Not Found'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  db.getConnection()
    .then(() => console.log('✅ Database connected'))
    .catch(err => console.error('❌ Database error:', err));
});

const allowedOrigins = ['http://localhost:3000', 'https://your-deployed-frontend.com'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));




// main home page

// Add these routes to your existing server.js
// Serve home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

// Placeholder routes
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html')); // Create later
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html')); // Create later
});


//sign up page

// Add this with your other imports
import signupRoutes from './routes/signupRoutes.js';

// Add this with your other route middleware
app.use('/api/signup', signupRoutes);

// Add this to ensure signup.html is served
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});