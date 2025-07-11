import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddContact() {
function checkAuth(){
const token = localStorage.getItem('token');
  if(!token){
    window.location.href = "/register";
  }
  return token;
}
const token=checkAuth();


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
      setFormData((prev) => ({
        ...prev,
        [id]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
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
        headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${token}` },

      });

      alert("Contact added successfully");
      navigate("/");
    } catch (error) {
      console.error("Error adding contact:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="bg-[#f2f0f057] flex mx-auto items-center h-[100vh] w-[98.5vw]">
      <div className="mx-auto rounded-t-md flex-col min-h-[70%] h-[75%] justify-center items-center w-[85%]">
        <div className="border border-[#dbd8d8] bg-[#435D7D] flex px-10 py-4 text-white justify-between rounded-t-md">
          <h5 className="uppercase text-[1.7rem] font-serif">Add New Contact</h5>
        </div>

        <div className="w-full pb-5 border bg-white/80 border-[#dbd8d8]">
          <div className="w-full max-w-full overflow-hidden px-4 py-2">
            <form onSubmit={handleSubmit}>
              {[
                { id: "first_name", label: "First Name", type: "text" },
                { id: "last_name", label: "Last Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
                { id: "phone", label: "Phone", type: "text" },
              ].map(({ id, label, type }) => (
                <div className="mb-3" key={id}>
                  <label className="font-medium mb-1 block" htmlFor={id}>
                    {label}
                  </label>
                  <input
                    required
                    type={type}
                    id={id}
                    value={formData[id]}
                    onChange={handleChange}
                    style={{ fontSize: "1rem" }}
                    className="rounded-md border px-2 border-[#dbd8d8] h-9 w-full focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
                  />
                </div>
              ))}

              <div className="mb-3">
                <label className="font-medium mb-1 block" htmlFor="address">
                  Address
                </label>
                <textarea
                  required
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  style={{ fontSize: "1rem" }}
                  className="rounded-md h-20 border px-2 border-[#dbd8d8] w-full focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
                />
              </div>

              <div className="mb-3">
                <label className="font-medium mb-1 block" htmlFor="profile_pic">
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="profile_pic"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-64 rounded px-3 text-sm bg-gray-300"
                />
              </div>

              <hr className="my-4" />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 text-white rounded"
                >
                  Submit
                </button>
                <Link to="/" className="text-black">
                  <button
                    type="button"
                    className="border border-gray-400 px-3 py-1 hover:bg-gray-600 hover:text-white rounded"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddContact;
