import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import protectedRoute from './routes/protectedRoute.js';
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,  // Allow cookies and other credentials
};

app.use(cors(corsOptions));

app.options('*', cors());

// Home endpoint
app.get('/', (req, res) => {
  res.status(200).send('OK');
});
// Use the auth routes
app.use('/api/auth', authRoutes);

// Use the protected route
app.use('/api/user', protectedRoute);

// Health check endpoint
app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
