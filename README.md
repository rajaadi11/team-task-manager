# 🚀 TaskFlow - Team Task Manager

A full-stack **Team Task Management Application** with role-based access control (**Admin & Member**) built using the **MERN Stack** and deployed on Railway. This application helps teams efficiently manage projects, assign tasks, monitor progress, and improve collaboration.

---

## 🌐 Live Demo

### Frontend Live URL
https://zippy-wisdom-production-af40.up.railway.app/login

---

# ✨ Features

## 🔐 Authentication & Authorization
- JWT-based secure authentication
- Password hashing using bcrypt
- Role-based access control (Admin & Member)
- Protected frontend routes and backend APIs

## 👨‍💼 Admin Features
- Create and manage projects
- Create and assign tasks
- Manage team members
- View all tasks and analytics
- Full CRUD operations

## 👨‍💻 Member Features
- View assigned tasks
- Update task status
- Access personal dashboard
- View assigned project details

## 📊 Dashboard
- Task statistics
- Overdue task alerts
- Task status overview
- Priority indicators
- Real-time updates

## 📁 Project Management
- Create projects with descriptions
- Add team members
- Project status tracking
- Team collaboration support

## ✅ Task Management
- Create and assign tasks
- Set task priorities:
  - Low
  - Medium
  - High
- Task workflow:
  - Pending
  - In Progress
  - Completed
- Deadline tracking

---

# 🛠️ Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- CORS
- express-validator

## Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React
- React Hot Toast

---

# 📁 Project Structure

```bash
team-task-manager/
│
├── backend/
│   ├── config/
│   │   └── db.js                         # MongoDB connection setup
│   │
│   ├── controllers/
│   │   ├── authController.js             # Authentication logic
│   │   ├── projectController.js          # Project CRUD operations
│   │   ├── taskController.js             # Task CRUD & dashboard stats
│   │   └── userController.js             # User management logic
│   │
│   ├── middleware/
│   │   ├── auth.js                       # JWT auth & role protection
│   │   └── error.js                      # Global error handler
│   │
│   ├── models/
│   │   ├── User.js                       # User schema
│   │   ├── Project.js                    # Project schema
│   │   └── Task.js                       # Task schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js                 # Authentication routes
│   │   ├── projectRoutes.js              # Project routes
│   │   ├── taskRoutes.js                 # Task routes
│   │   └── userRoutes.js                 # User routes
│   │
│   ├── utils/
│   │   └── jwt.js                        # JWT token helper functions
│   │
│   ├── .env.example                      # Environment variables template
│   ├── package.json                      # Backend dependencies
│   ├── package-lock.json
│   ├── server.js                         # Main backend entry point
│   ├── railway.json                      # Railway deployment config
│   ├── nixpacks.toml                     # Nixpacks build config
│   └── Procfile                          # Railway process file
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateProjectModal.jsx    # Create project modal
│   │   │   ├── CreateTaskModal.jsx       # Create task modal
│   │   │   ├── Layout.jsx                # Main application layout
│   │   │   ├── ProtectedRoute.jsx        # Route protection component
│   │   │   └── TaskList.jsx              # Task list component
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx           # Global authentication context
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx             # Dashboard page
│   │   │   ├── Login.jsx                 # Login page
│   │   │   ├── Projects.jsx              # Projects page
│   │   │   └── Register.jsx              # Register page
│   │   │
│   │   ├── services/
│   │   │   └── api.js                    # Axios API configuration
│   │   │
│   │   ├── utils/
│   │   │   └── helpers.js                # Utility/helper functions
│   │   │
│   │   ├── App.jsx                       # Root React component
│   │   ├── main.jsx                      # Frontend entry point
│   │   └── index.css                     # Global CSS styles
│   │
│   ├── .env.example                      # Frontend environment variables
│   ├── index.html                        # HTML template
│   ├── package.json                      # Frontend dependencies
│   ├── package-lock.json
│   ├── vite.config.js                    # Vite configuration
│   ├── tailwind.config.js                # Tailwind CSS config
│   ├── postcss.config.js                 # PostCSS config
│   ├── railway.json                      # Railway deployment config
│   └── nixpacks.toml                     # Nixpacks build config
│
├── .gitignore                            # Git ignored files                       
└── README.md                             # Project documentation
```

---

# ⚙️ Backend API

RESTful API for the Team Task Manager application.

---

## 🚀 Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 📦 Backend Dependencies

- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- express-validator

---

## 🗄️ Database Models

### User Model

```javascript
{
  name: String,
  email: String,
  password: String,
  role: ['admin', 'member']
}
```

### Project Model

```javascript
{
  name: String,
  description: String,
  createdBy: ObjectId,
  teamMembers: [ObjectId],
  status: ['active', 'completed', 'archived']
}
```

### Task Model

```javascript
{
  title: String,
  description: String,
  project: ObjectId,
  assignedTo: ObjectId,
  createdBy: ObjectId,
  status: ['pending', 'in-progress', 'completed'],
  priority: ['low', 'medium', 'high'],
  deadline: Date
}
```

---

# 🔐 Authentication

Protected routes require JWT token:

```bash
Authorization: Bearer <token>
```

---

# 📡 API Routes

## Authentication Routes (`/api/auth`)

| Method | Route | Description |
|---|---|---|
| POST | `/register` | Register user |
| POST | `/login` | Login user |
| GET | `/me` | Current user |

---

## Project Routes (`/api/projects`)

| Method | Route | Access |
|---|---|---|
| GET | `/` | Protected |
| POST | `/` | Admin |
| GET | `/:id` | Protected |
| PUT | `/:id` | Admin |
| DELETE | `/:id` | Admin |

---

## Task Routes (`/api/tasks`)

| Method | Route | Access |
|---|---|---|
| GET | `/` | Protected |
| POST | `/` | Admin |
| GET | `/stats/dashboard` | Protected |
| GET | `/:id` | Protected |
| PUT | `/:id` | Protected |
| DELETE | `/:id` | Admin |

---

## User Routes (`/api/users`)

| Method | Route | Access |
|---|---|---|
| GET | `/` | Admin |
| GET | `/members` | Admin |
| PUT | `/:id` | Admin |
| DELETE | `/:id` | Admin |

---

# 🎨 Frontend

React-based frontend with modern UI and responsive design.

---

## 🚀 Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start frontend
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 📦 Frontend Dependencies

- react
- react-dom
- react-router-dom
- axios
- react-hot-toast
- lucide-react
- tailwindcss

---

# 🎨 UI Features

- Responsive design
- Modern dashboard UI
- Protected routes
- Toast notifications
- Loading states
- Form validation
- Task badges & indicators

---

# 🧭 Frontend Routes

| Route | Access |
|---|---|
| `/login` | Public |
| `/register` | Public |
| `/dashboard` | Protected |
| `/projects` | Protected |

---

# 🔑 Environment Variables

## Backend `.env`

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLIENT_URL=https://zippy-wisdom-production-af40.up.railway.app
```

## Frontend `.env`

```env
VITE_API_URL=https://zippy-wisdom-production-af40.up.railway.app/api
```

---

# 🚀 Railway Deployment

Configured for Railway deployment using:
- railway.json
- nixpacks.toml
- Procfile

---

## Backend Railway Variables

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLIENT_URL=https://zippy-wisdom-production-af40.up.railway.app
```

---

## Frontend Railway Variables

```env
VITE_API_URL=https://zippy-wisdom-production-af40.up.railway.app/api
```

---

# 🚀 Deployment Steps

## 1. Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial Commit"
git branch -M main
git remote add origin <your_repo_url>
git push -u origin main
```

---

## 2. Deploy Backend
- Create Railway project
- Select GitHub repository
- Set root directory to `backend`
- Add environment variables
- Generate domain

---

## 3. Deploy Frontend
- Add another Railway service
- Set root directory to `frontend`
- Add frontend environment variable
- Generate domain

---

# 🧪 Testing

## Admin Flow
- Login/Register as Admin
- Create project
- Assign tasks
- Manage users

## Member Flow
- Login/Register as Member
- View assigned tasks
- Update task progress

---

# 🐛 Common Issues

## MongoDB Connection Error
- Verify MongoDB Atlas URI
- Whitelist IP `0.0.0.0/0`

## CORS Error
- Ensure `CLIENT_URL` matches frontend URL

## Railway Build Failure
- Check build logs
- Verify dependencies
- Ensure Node.js version ≥ 18

---

# 👨‍💻 Author

**Aditya Raj**

---

# 📄 License

© 2026 Aditya Raj. All Rights Reserved.

---

# 🙏 Acknowledgements

- MongoDB Atlas
- Railway
- Tailwind CSS
- React Community

---

# 🔗 Important Links

## Frontend
https://zippy-wisdom-production-af40.up.railway.app/login

## Railway
https://railway.app

## MongoDB Atlas
https://www.mongodb.com/cloud/atlas