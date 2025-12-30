import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [validations, setValidations] = useState({
    length: false,
    case: false,
    number: false,
    special: false
  });

  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setValidations({
      length: val.length >= 8,
      case: /[a-z]/.test(val) && /[A-Z]/.test(val),
      number: /\d/.test(val),
      special: /[!@#$%^&*]/.test(val)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!Object.values(validations).every(Boolean)) {
      toast.error("Please meet all password requirements.");
      return;
    }

    try {
      await API.post("/auth/signup", { fullName, email, password });
      
      toast.success("Signup successful! Please login.");
      navigate("/login"); 
      
    } catch (err) {
       if (err.response?.data?.errors) {
         toast.error(err.response.data.errors[0].msg);
       } else {
         toast.error(err.response?.data?.message || "Signup failed");
       }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" 
              value={password} 
              onChange={handlePasswordChange} 
              required 
            />
            {/* Validation Checklist */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-500">
               <ValidationItem valid={validations.length} text="8+ Characters" />
               <ValidationItem valid={validations.case} text="Upper & Lowercase" />
               <ValidationItem valid={validations.number} text="One Number" />
               <ValidationItem valid={validations.special} text="Special Char (!@#$)" />
            </div>
          </div>

          {/* 4. New Confirm Password Field */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input 
              type="password" 
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${confirmPassword && password !== confirmPassword ? 'border-red-500' : ''}`}
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300">Sign Up</button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

const ValidationItem = ({ valid, text }) => (
  <div className={`flex items-center ${valid ? "text-green-600 font-bold" : "text-gray-400"}`}>
    <span className="mr-1">{valid ? "✔" : "○"}</span>
    {text}
  </div>
);

export default Signup;