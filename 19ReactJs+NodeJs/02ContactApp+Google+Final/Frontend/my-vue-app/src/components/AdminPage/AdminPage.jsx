import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/auth/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("❌ Error deleting user:", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("❌ Error fetching users:", err));
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-6xl backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-6">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow">
          All Registered Users
        </h2>

        <div className="overflow-x-auto rounded-xl bg-white/70 shadow-inner">
          <table className="w-full table-auto text-left border-collapse">
            <thead className="bg-purple-200 text-purple-800 text-sm uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 border border-white">#</th>
                <th className="px-4 py-3 border border-white">Username</th>
                <th className="px-4 py-3 border border-white">Email</th>
                <th className="px-4 py-3 border border-white">Created At</th>
                <th className="px-4 py-3 border border-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="even:bg-white odd:bg-purple-50 hover:bg-purple-100 transition"
                  >
                    <td className="px-4 py-2 border border-white text-sm">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border border-white text-sm">
                      {user.username}
                    </td>
                    <td className="px-4 py-2 border border-white text-sm break-words">
                      {user.email}
                    </td>
                    <td className="px-4 py-2 border border-white text-sm">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border border-white text-sm">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-700">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
