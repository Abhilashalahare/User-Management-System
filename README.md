🖥️ Backend Setup
Navigate to Backend Folder
cd backend
npm install

Create .env File (backend/.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

Start Backend Server
npm run dev


Backend will run at:
👉 http://localhost:5000

🌐 Frontend Setup
Navigate to Frontend Folder
cd frontend
npm install

Create .env File (frontend/.env)
VITE_API_URL=http://localhost:5000/api

Start Frontend Application
npm run dev


Frontend will run at:
👉 http://localhost:5173

🔐 Environment Variables
Backend (backend/.env)
Variable	Description
PORT	Server port (default: 5000)
MONGO_URI	MongoDB Atlas connection string
JWT_SECRET	Secret key for JWT signing
Frontend (frontend/.env)
Variable	Description
VITE_API_URL	Backend API base URL
📡 API Endpoints
🔑 Authentication
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Login & receive JWT
👤 User Routes (Protected)
Method	Endpoint	Description
GET	/api/users/profile	Get logged-in user details
PUT	/api/users/profile	Update name, email, or password
👑 Admin Routes (Protected)
Method	Endpoint	Description
GET	/api/users?page=1	Get all users with pagination
PUT	/api/users/:id	Update user details
PATCH	/api/users/:id/status	Toggle user active/inactive status
🔒 Security Features

Passwords hashed with Bcrypt

JWT-based authentication

Protected routes using middleware

Role-based authorization (Admin/User)

📄 License

This project is licensed under the MIT License.
