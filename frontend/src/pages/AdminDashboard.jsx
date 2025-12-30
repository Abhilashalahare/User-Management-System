import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaUserEdit, FaTimes, FaSave } from "react-icons/fa";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ fullName: "", email: "" });

  const fetchUsers = async (pageNum) => {
    try {
      setLoading(true);
      const query = { role: { $ne: 'admin' } }; 
      const { data } = await API.get(`/users?page=${pageNum}`);
      setUsers(data.users);
      setPage(data.page);
      setTotalPages(data.pages);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load users");
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(page); }, [page]);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await API.patch(`/users/${userId}/status`, { status: newStatus });
      toast.success(`User marked as ${newStatus}`);
      fetchUsers(page);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({ fullName: user.fullName, email: user.email });
    setIsModalOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/users/${editingUser._id}`, formData);
      toast.success("User details updated!");
      setIsModalOpen(false);
      fetchUsers(page); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading users...</div>;

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>
      
      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs leading-normal">
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                         {user.fullName.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium block">{user.fullName}</span>
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                  <span className="bg-purple-100 text-purple-600 py-1 px-3 rounded-full text-xs font-bold uppercase">
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <span className={`py-1 px-3 rounded-full text-xs font-bold uppercase ${user.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center space-x-3">
                  
                    <button 
                      onClick={() => openEditModal(user)}
                      className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition"
                      title="Edit User"
                    >
                      <FaUserEdit />
                    </button>
                    
                 
                    <button
                      onClick={() => handleStatusChange(user._id, user.status === 'active' ? 'inactive' : 'active')}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition ${
                        user.status === 'active' ? 'bg-red-400 hover:bg-red-500' : 'bg-green-400 hover:bg-green-500'
                      }`}
                      title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                      {user.status === 'active' ? <FaTrash size={12} /> : <FaSave size={12} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="flex justify-center mt-6 space-x-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-300">Previous</button>
        <span className="px-4 py-2">Page {page} of {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-300">Next</button>
      </div>

      {/* --- EDIT USER MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <FaUserEdit /> Edit User
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="hover:text-gray-200">
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;