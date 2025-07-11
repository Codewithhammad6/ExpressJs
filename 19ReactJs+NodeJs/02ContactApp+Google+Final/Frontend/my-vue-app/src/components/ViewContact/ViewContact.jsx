import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ViewContact() {
  const navigate = useNavigate();
  const { id } = useParams();

  function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/register");
    }
    return token;
  }

  const token = checkAuth();
  const [contact, setContact] = useState(null);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Contact deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/contact/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data) {
          alert("Contact not found");
          navigate("/");
        } else {
          setContact(res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching contact:", err);
        navigate("/");
      });
  }, [id, navigate, token]);

  return (
    <div className="min-h-screen pt-24 pb-10 px-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="w-full max-w-3xl backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow">
          Contact Details
        </h2>

        {contact ? (
          <>
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <img
                src={`http://localhost:5000/uploads/${contact.profile_pic}`}
                alt="Profile"
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-300 shadow"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150?text=No+Image";
                }}
              />
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-white">
              <div>
                <label className="block font-semibold">First Name</label>
                <p className="bg-white/80 text-black border px-3 py-2 rounded mt-1">
                  {contact.first_name}
                </p>
              </div>
              <div>
                <label className="block font-semibold">Last Name</label>
                <p className="bg-white/80 text-black border px-3 py-2 rounded mt-1">
                  {contact.last_name}
                </p>
              </div>
              <div>
                <label className="block font-semibold">Email</label>
                <p className="bg-white/80 text-black border px-3 py-2 rounded mt-1 break-all">
                  {contact.email}
                </p>
              </div>
              <div>
                <label className="block font-semibold">Phone</label>
                <p className="bg-white/80 text-black border px-3 py-2 rounded mt-1">
                  {contact.phone}
                </p>
              </div>
              <div className="sm:col-span-2">
                <label className="block font-semibold">Address</label>
                <p className="bg-white/80 text-black border px-3 py-2 rounded mt-1">
                  {contact.address}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to={`/editcontact/${id}`}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 shadow-md rounded transition">
                  Edit
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md transition"
              >
                Delete
              </button>
              <Link to="/" className=" hover:bg-[#f77ad2] rounded text-white ">
                <button className="border border-white   px-4 py-2 rounded  shadow-md transition">
                  Cancel
                </button>
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-white">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default ViewContact;
