import express from 'express';
import authRoutes from './routes/auth.js'; // Adjust the path as necessary
import protectedRoute from './routes/protectedRoute.js'; // Adjust the path as necessary
import cors from 'cors';
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Use the auth routes
app.use('/api/auth', authRoutes);

// Use the protected route
app.use('/api/user', protectedRoute);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/healthcheck', (req, res) => {
  res.status(200);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
