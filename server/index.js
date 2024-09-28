import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import protectedRoute from './routes/protectedRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __filename and __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,  // Allow cookies and other credentials
};

app.use(cors(corsOptions));

app.options('*', cors());

// Use the auth routes
app.use('/api/auth', authRoutes);

// Use the protected route
app.use('/api/user', protectedRoute);

// Serve the frontend from the same server
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
