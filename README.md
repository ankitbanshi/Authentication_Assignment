# Full-Stack Mini Project - Role-Based Authentication

A full-stack web application with role-based authentication (User/Admin) built with Next.js, Express, MongoDB, and JWT.

## 🚀 Features

- **Role-Based Authentication**: Sign up and login with User or Admin roles
- **Secure Password Storage**: Passwords are hashed using bcrypt
- **JWT Authentication**: Token-based authentication for secure API access
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Modern UI**: Beautiful, responsive design with TailwindCSS
- **TypeScript**: Full type safety across frontend and backend

## 📋 Tech Stack

### Backend
- Node.js with Express
- MongoDB (MongoDB Atlas)
- Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- Next.js 14 with TypeScript
- TailwindCSS for styling
- React Hook Form for form handling
- Zod for form validation
- Axios for API calls

## 📁 Project Structure

```
MiniProject/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── ProtectedRoute.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── auth.ts
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (free tier)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB Atlas connection string and JWT secret:
```env
MONGODB_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (copy from `.env.example`):
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your backend URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🔐 API Endpoints

### POST /auth/signup
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "User"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

### GET /auth/me
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

## 🚢 Deployment


#### Deployed Both Frontend and Backend to Vercel 

**Frontend:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Add New Project" → Import your repository
4. Set **Root Directory** to `frontend`
5. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Will be set after backend deployment
6. Click "Deploy"

**Backend:**
1. In Vercel, create another project from the same repository
2. Set **Root Directory** to `backend`
3. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
4. Click "Deploy"
5. Copy the backend URL and update `NEXT_PUBLIC_API_URL` in frontend project


**Frontend (Vercel):**
1. Deploy to Vercel as above
2. Set `NEXT_PUBLIC_API_URL` to your Render backend URL

📖 **See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed step-by-step instructions**

### MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and use it in your `.env` file


## 📝 Notes

- Passwords must be at least 6 characters long
- JWT tokens expire after 7 days
- The dashboard shows different content based on user role
- All routes are protected except login and signup pages

## 🔒 Security Features

- Passwords are hashed using bcrypt
- JWT tokens for stateless authentication
- Protected API routes with authentication middleware
- CORS enabled for cross-origin requests
- Input validation on both frontend and backend

## 👤 Author

Created as a full-stack mini project assignment.

