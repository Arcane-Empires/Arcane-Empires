import express from 'express';
import authRoutes from './routes/auth.js'; // Adjust the path as necessary
import protectedRoute from './routes/protectedRoute.js'; // Adjust the path as necessary
import path from 'path';
import cors from 'cors';
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

// Middleware to enable CORS
app.use(cors());

// Serve frontend from the same server
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use the auth routes
app.use('/api/auth', authRoutes);

// Use the protected route
app.use('/api/user', protectedRoute);

app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK'); // Add send response
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
