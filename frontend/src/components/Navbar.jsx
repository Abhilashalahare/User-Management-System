import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa"; 

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
       
        <Link to="/" className="text-xl font-bold text-indigo-400 hover:text-indigo-300">
          Mini User Management System
        </Link>

        <div className="space-x-4 flex items-center">
          {user ? (
            <>
              <span className="text-gray-300 mr-2 hidden sm:inline">Hello, {user.fullName}</span>
              
              <Link 
                to="/profile" 
                className="text-2xl hover:text-indigo-400 transition duration-200" 
                title="Profile" 
              >
                <FaUserCircle />
              </Link>
              
              {user.role === "admin" && (
                <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 transition">
                  Admin
                </Link>
              )}
              
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-300 transition">Login</Link>
              <Link to="/signup" className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded transition ml-2">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;