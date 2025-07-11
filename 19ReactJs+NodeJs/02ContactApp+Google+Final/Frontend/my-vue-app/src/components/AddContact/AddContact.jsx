import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddContact() {
  function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/register";
    }
    return token;
  }

  const token = checkAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    profile_pic: null,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "profile_pic") {
      setFormData((prev) => ({ ...prev, [id]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await axios.post("http://localhost:5000/api/contact", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Contact added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error adding contact:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-10">
      <div className="mt-16 w-full max-w-3xl backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow">
          Add New Contact
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-white">
          {/* Input Fields */}
          {[
            { id: "first_name", label: "First Name", type: "text" },
            { id: "last_name", label: "Last Name", type: "text" },
            { id: "email", label: "Email", type: "email" },
            { id: "phone", label: "Phone", type: "text" },
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block font-medium mb-1">
                {label}
              </label>
              <input
                type={type}
                id={id}
                value={formData[id]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md bg-white/80 text-black border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner"
              />
            </div>
          ))}

          {/* Address */}
          <div>
            <label htmlFor="address" className="block font-medium mb-1">
              Address
            </label>
            <textarea
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 rounded-md bg-white/80 text-black border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label htmlFor="profile_pic" className="block font-medium mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              id="profile_pic"
              accept="image/*"
              onChange={handleChange}
              className="file:bg-purple-600 file:text-white file:px-3 file:py-1 file:rounded-md file:border-none bg-white/90 text-black rounded-md w-full"
            />
          </div>

          <hr className="border-white/30" />

          {/* Buttons */}
          <div className="flex justify-between items-center gap-4 mt-4">
            <button
              type="submit"
              className="w-full bg-white text-purple-700 font-bold py-2 rounded hover:bg-purple-100 shadow-md hover:shadow-lg transition-all"
            >
              Submit
            </button>
            <Link to="/" className="w-full hover:bg-[#c562d2]">
              <button
                type="button"
                className="w-full bg-transparent text-white border border-white py-2 rounded hover:bg-white hover:text-purple-700 transition-all"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContact;
