# 👤 Mini User Management System 

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Completed-success)

A full-stack **Role-Based Access Control (RBAC)** application built using the **MERN stack**.  
The system provides secure authentication, user profile management, and an admin dashboard to manage users with pagination and account status control.

---

## 🚀 Key Features

- 🔐 JWT-based authentication
- 🛡️ Role-Based Access Control (Admin / User)
- 📊 Admin dashboard with pagination
- ✏️ Edit user details (Admin)
- 🔄 Activate / deactivate user accounts
- 👤 User profile view & edit mode
- 🔒 Password hashing using Bcrypt
- 🎨 Responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, React Router DOM, Axios, React Toastify  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas, Mongoose  
- **Authentication:** JWT (JSON Web Tokens), Bcrypt  

---

## ⚙️ Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Install Dependencies (Backend)
```bash
cd backend
npm install
```

### Install Dependencies (Frontend)
```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Run the App

### Backend
```bash
cd backend
npm run dev
```

Backend will run at:  
👉 http://localhost:5000

### Frontend
```bash
cd frontend
npm run dev
```

Frontend will run at:  
👉 http://localhost:5173

---

## 📡 API Endpoints

### 🔑 Authentication
- **POST** `/api/auth/signup` – Register a new user  
- **POST** `/api/auth/login` – Login & receive JWT  

### 👤 User Routes (Protected)
- **GET** `/api/users/profile` – Get logged-in user details  
- **PUT** `/api/users/profile` – Update name, email, or password  

### 👑 Admin Routes (Protected)
- **GET** `/api/users?page=1` – Get all users with pagination  
- **PUT** `/api/users/:id` – Update user details  
- **PATCH** `/api/users/:id/status` – Toggle active/inactive user status  

---

## 🔒 Security Features

- Passwords hashed using **Bcrypt**
- JWT-based authentication
- Protected routes using middleware
- Role-based authorization (Admin / User)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

**Abhilasha Lahare**

- GitHub: https://github.com/Abhilashalahare
- LinkedIn: https://linkedin.com/in/abhhilashha
