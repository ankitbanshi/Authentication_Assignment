import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS configuration - allows all origins for Vercel deployments
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    // Allow localhost and all Vercel domains
    if (origin.includes('localhost') || origin.includes('vercel.app')) {
      return callback(null, true);
    }
    // Allow specific frontend URL if set
    if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    }
    callback(null, true); // Allow all for simplicity (can restrict in production)
  },
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Only listen on PORT if not in Vercel (serverless)
    if (process.env.VERCEL !== '1') {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    if (process.env.VERCEL !== '1') {
      process.exit(1);
    }
  });

// Export for Vercel serverless
export default app;

