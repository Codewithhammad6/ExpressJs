import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/register";
    }
    return token;
  }

  const token = checkAuth();
  const [contacts, setContacts] = useState([]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setContacts(res.data))
      .catch((err) => console.log("Error fetching contacts:", err));
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-24">
      <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#333] font-serif">All Contacts</h2>
          <Link to="/addcontact" className="mt-3 sm:mt-0">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold shadow-md transition">
              + Add New
            </button>
          </Link>
        </div>

        <div className="w-full overflow-x-auto rounded-md shadow">
          <table className="min-w-[700px] w-full table-auto border-collapse text-sm sm:text-base bg-white">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-3 py-2 text-left">#</th>
                <th className="px-3 py-2 text-left">Profile</th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">Phone</th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, index) => (
                  <tr
                    key={contact._id}
                    className="even:bg-gray-100 odd:bg-white hover:bg-gray-50 transition"
                  >
                    <td className="px-3 py-2">{index + 1}</td>
                    <td className="px-3 py-2">
                      <img
                        src={
                          contact.profile_pic
                            ? `http://localhost:5000/uploads/${contact.profile_pic}`
                            : "https://via.placeholder.com/40?text=N/A"
                        }
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/40?text=N/A";
                        }}
                      />
                    </td>
                    <td className="px-3 py-2">{contact.first_name} {contact.last_name}</td>
                    <td className="px-3 py-2 break-all">{contact.email}</td>
                    <td className="px-3 py-2">{contact.phone}</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-2">
                        <Link to={`/viewcontact/${contact._id}`}>
                          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs shadow">
                            View
                          </button>
                        </Link>
                        <Link to={`/editcontact/${contact._id}`}>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs shadow">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(contact._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs shadow"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-600">
                    No contacts found.
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

export default Home;
