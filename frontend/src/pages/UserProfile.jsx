import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaIdBadge, FaEdit, FaSave, FaTimes, FaLock } from "react-icons/fa";

const UserProfile = () => {
  const { user, login } = useContext(AuthContext);
  
  const [isEditing, setIsEditing] = useState(false);
  
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        password: "" 
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updates = { 
        fullName: formData.fullName, 
        email: formData.email 
      };
      
      if (formData.password.trim() !== "") {
        updates.password = formData.password;
      }

      const { data } = await API.put("/users/profile", updates);
      
      login(data, data.token); 
      toast.success("Profile updated successfully!");
      
      setIsEditing(false);
      setShowPasswordChange(false);
      setFormData(prev => ({ ...prev, password: "" }));

    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
        
        <div className=" bg-indigo-600 px-8 py-6 flex justify-between items-center text-white">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <FaIdBadge className="text-indigo-200" /> My Profile
            </h2>
            <p className="text-indigo-100 mt-1 opacity-90">Manage your personal information</p>
          </div>
          
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-gray-100 transition"
            >
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <button 
              onClick={() => { setIsEditing(false); setShowPasswordChange(false); }}
              className="flex items-center gap-2 bg-red-400 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-500 transition"
            >
              <FaTimes /> Cancel
            </button>
          )}
        </div>

        <div className="p-8">
          <form onSubmit={handleUpdate}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              
              <div className="space-y-2">
                <label className="text-gray-500 text-sm font-semibold uppercase tracking-wide flex items-center gap-2">
                  <FaUser /> Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full text-lg px-4 py-2 border-2 border-indigo-100 rounded-lg focus:border-indigo-500 focus:outline-none transition"
                  />
                ) : (
                  <p className="text-2xl font-semibold text-gray-800 border-b pb-2 border-gray-100">
                    {user?.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-gray-500 text-sm font-semibold uppercase tracking-wide flex items-center gap-2">
                  <FaEnvelope /> Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-lg px-4 py-2 border-2 border-indigo-100 rounded-lg focus:border-indigo-500 focus:outline-none transition"
                  />
                ) : (
                  <p className="text-2xl font-semibold text-gray-800 border-b pb-2 border-gray-100">
                    {user?.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Role</label>
                <div className="flex items-center gap-2">
                  <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${user?.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                    {user?.role}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Account Status</label>
                <div className="flex items-center gap-2">
                  <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${user?.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                    {user?.status}
                  </span>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="border-t pt-6 mt-6">
                 {!showPasswordChange ? (
                   <button 
                     type="button"
                     onClick={() => setShowPasswordChange(true)}
                     className="text-indigo-600 font-semibold hover:underline flex items-center gap-2"
                   >
                     <FaLock /> Change Password?
                   </button>
                 ) : (
                   <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 animate-fade-in">
                     <div className="flex justify-between mb-4">
                       <h3 className="font-bold text-gray-700 flex items-center gap-2">
                         <FaLock /> Security Settings
                       </h3>
                       <button 
                         type="button" 
                         onClick={() => setShowPasswordChange(false)}
                         className="text-sm text-red-500 hover:underline"
                       >
                         Cancel
                       </button>
                     </div>
                     
                     <label className="block text-gray-600 text-sm font-bold mb-2">New Password</label>
                     <input
                       type="password"
                       name="password"
                       placeholder="Enter new password (leave blank to keep current)"
                       value={formData.password}
                       onChange={handleChange}
                       minLength="6"
                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                     />
                     <p className="text-xs text-gray-400 mt-2">
                       * Requirements: 8+ characters, 1 Uppercase, 1 Number, 1 Special Char.
                     </p>
                   </div>
                 )}
              </div>
            )}

            {isEditing && (
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-indigo-700 hover:shadow-lg transition transform hover:-translate-y-0.5"
                >
                  <FaSave /> Save Changes
                </button>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;