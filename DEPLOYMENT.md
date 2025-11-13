# Deployment Guide - Vercel

This guide will help you deploy your full-stack application to Vercel.

## 📋 Prerequisites

1. GitHub account
2. Vercel account (free tier available)
3. MongoDB Atlas account (free tier available)
4. All code pushed to GitHub

## 🚀 Deployment Steps

### Step 1: Prepare Your Backend for Vercel

Vercel supports serverless functions. We need to adapt the Express backend to work with Vercel's serverless architecture.

#### Option A: Deploy Backend to Vercel (Serverless Functions)

1. **Create `vercel.json` in the backend directory:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb_uri",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

2. **Update `backend/server.js` for Vercel:**

The server.js needs to export the Express app for Vercel:

```javascript
// Keep your existing code, but add at the end:
export default app;
```

#### Option B: Deploy Backend to Render/Railway (Recommended for Express)

If you prefer to keep Express as-is, deploy to Render or Railway:

**Render:**
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Set root directory to `backend`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables

**Railway:**
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repo
4. Set root directory to `backend`
5. Add environment variables

### Step 2: Deploy Frontend to Vercel

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

2. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

3. **Import Project:**
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the repository

4. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

5. **Environment Variables:**
   Add these in Vercel dashboard:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
   ```
   Or if using Render/Railway:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
   ```

6. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete

### Step 3: Update Backend CORS (If Deployed Separately)

If your backend is on Render/Railway, update CORS in `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app'
  ],
  credentials: true
}));
```

### Step 4: MongoDB Atlas Configuration

1. **Network Access:**
   - Go to MongoDB Atlas Dashboard
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allows all IPs) OR add Vercel's IP ranges

2. **Database User:**
   - Ensure you have a database user created
   - Use the connection string in your backend environment variables

### Step 5: Environment Variables Setup

#### For Vercel Frontend:
- `NEXT_PUBLIC_API_URL` - Your backend URL

#### For Backend (Vercel/Render/Railway):
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - A secure random string
- `PORT` - Usually auto-set by platform
- `NODE_ENV` - `production`

## 🔧 Vercel-Specific Backend Setup

If deploying backend to Vercel, create `backend/api/index.js`:

```javascript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../routes/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
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
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

export default app;
```

Then update `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.js"
    }
  ]
}
```

## 📝 Post-Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend deployed and accessible
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] MongoDB Atlas allows connections from deployment IPs
- [ ] Test signup/login functionality
- [ ] Test protected routes
- [ ] Check browser console for errors

## 🔗 Getting Your URLs

### Vercel Frontend:
- Production URL: `https://your-project.vercel.app`
- Preview URLs for each branch

### Backend URLs:
- **Vercel:** `https://your-backend.vercel.app`
- **Render:** `https://your-backend.onrender.com`
- **Railway:** `https://your-backend.railway.app`

## 🐛 Troubleshooting

### Frontend can't connect to backend:
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend is deployed and running
- Check CORS settings in backend

### Backend connection errors:
- Verify MongoDB Atlas connection string
- Check Network Access in MongoDB Atlas
- Ensure environment variables are set

### Build errors:
- Check Node.js version (Vercel uses Node 18+)
- Verify all dependencies in package.json
- Check build logs in Vercel dashboard

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)

