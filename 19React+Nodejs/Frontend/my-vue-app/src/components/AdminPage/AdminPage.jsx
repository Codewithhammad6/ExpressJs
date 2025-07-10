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

      // ✅ Remove user from UI
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("❌ Error deleting user:", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching users:", err);
      });
  }, [token]);

  return (
    <div className="bg-[#c9c7c7d3] flex mx-auto items-center h-[100vh] w-[98.5vw]">
      <div className="mx-auto rounded-t-md flex-col min-h-[70%] h-[75%] justify-center items-center w-[85%]">
        <div className="border-[.1rem] border-[#dbd8d8] mb-1 bg-[#435D7D] flex px-10 py-4 text-white justify-between rounded-t-md">
          <h2 className="uppercase text-[1.7rem] font-serif">All Users</h2>
        </div>

        <div className="w-full pb-5 border-[.1rem] border-[#dbd8d8]">
          <div className="w-full max-w-full overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 text-sm lg:text-xl">#</th>
                  <th className="border border-gray-300 px-2 py-2 text-sm lg:text-xl">Username</th>
                  <th className="border border-gray-300 px-2 py-2 text-sm lg:text-xl">Email</th>
                  <th className="border border-gray-300 px-2 py-2 text-sm lg:text-xl">Created At</th>
                  <th className="border border-gray-300 px-2 py-2 text-sm lg:text-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user._id} className="even:bg-gray-300 odd:bg-white hover:bg-gray-200">
                      <td className="border border-gray-300 px-2 py-1 text-sm lg:text-[15px]">{index + 1}</td>
                      <td className="border border-gray-300 px-2 py-1 text-sm lg:text-[15px]">{user.username}</td>
                      <td className="border border-gray-300 px-2 py-1 text-sm lg:text-[15px] break-all">{user.email}</td>
                      <td className="border border-gray-300 px-2 py-1 text-sm lg:text-[15px]">
                        {new Date(user.createdAt).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-sm lg:text-[15px]">
                        <button
                          className="bg-red-500 text-white px-2 py-[2px] text-xs rounded hover:bg-red-600"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
