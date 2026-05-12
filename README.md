# 🚀 Team Task Manager

A full-stack web application for managing team projects and tasks with role-based access control.

---

## 📌 Features

* 🔐 **Authentication**

  * Signup/Login using JWT
  * Password hashing with bcrypt

* 👥 **Role-Based Access**

  * **Admin**: Create projects, assign tasks, manage team
  * **Member**: View and update assigned tasks

* 📁 **Project Management**

  * Create and manage projects
  * Add team members

* ✅ **Task Management**

  * Create tasks with title, description, deadline
  * Assign tasks to members
  * Update status (Pending, In Progress, Completed)

* 📊 **Dashboard**

  * View tasks summary
  * Track task status

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## 📁 Project Structure

```
team-task-manager/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateProjectModal.jsx
│   │   │   ├── CreateTaskModal.jsx
│   │   │   └── TaskList.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
└── README.md   ✅
```

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```id="0o8m7d"
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_EXPIRE=7d
PORT=5000
CLIENT_URL=http://localhost:5173
```

---

### Frontend (`frontend/.env`)

```id="fy9v1y"
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Run Locally

### Clone Repository

```id="c42r9m"
git clone https://github.com/your-username/team-task-manager.git
cd team-task-manager
```

---

### Backend Setup

```id="kmp9dz"
cd backend
npm install
npm run dev
```

---

### Frontend Setup

```id="j9n1k2"
cd frontend
npm install
npm run dev
```

---

### Open App

```id="s6r4yq"
http://localhost:5173
```

---

## 🌐 Deployment

### Backend (Railway)

* Deploy `backend` folder
* Add environment variables

### Frontend (Vercel)

* Deploy `frontend` folder
* Set:

```id="z8h7xp"
VITE_API_URL=https://your-backend-url/api
```

---

## 🧪 Demo Flow

1. Register as Admin
2. Login
3. Create Project
4. Assign Tasks
5. Update Task Status

---

## 🎥 Demo Video

*Add your video link here*

---

## 🔗 Live Demo

*Add your deployed app link here*

---

## 👨‍💻 Author

**Aditya Raj**

---

## 📄 License

MIT License
