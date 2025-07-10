import React, { useState ,useEffect} from "react";
import { Link, useNavigate,useParams  } from "react-router-dom";
import axios from "axios";
function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();

  function checkAuth(){
const token = localStorage.getItem('token');
  if(!token){
    window.location.href = "/register";
  }
  return token;
}
const token=checkAuth();



const [formData, setFormData] = useState({
  first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    profile_pic:null
})

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = new FormData();
    
    for (const key in formData) {
      if (key === "profile_pic") {
        if (formData.profile_pic instanceof File) {
          data.append(key, formData.profile_pic);
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    await axios.put(`http://localhost:5000/api/contact/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${token}` },
    });

    alert("Contact updated successfully");
    navigate("/");
  } catch (error) {
    console.error("Error updating contact:", error);
  }
};


const handleChange = (e) => {
  const { id, value, files } = e.target;

  if (id === "profile_pic") {
    setFormData((prev) => ({...prev,profile_pic: files[0], // only the first file
    }));
  } else {
    setFormData((prev) => ({...prev,[id]: value,}));
  }
};


useEffect(() => {
  axios.get(`http://localhost:5000/api/contact/${id}`,{
       headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      const contactData = res.data;
      setFormData({
        ...contactData,
        profile_pic: null  // so file input stays clean (user can optionally upload new)
      });
    })
    .catch((err) => console.error("Error loading contact:", err));
}, [id,token,navigate]);



 return (
    <div className="bg-[#f2f0f057] flex mx-auto items-center h-[100vh] w-[98.5vw] ">
      <div className="mx-auto  rounded-t-md flex-col min-h-[70%] h-[75%] justify-center items-center w-[85%] ">
        <div className="border-[.1rem] border-[#dbd8d8] bg-[#435D7D] flex px-10 py-4 text-white justify-between rounded-t-md">
          <div>
            <h5 className="uppercase text-[1.7rem] font-serif">
              Update Contact
            </h5>
          </div>
        </div>
        <div className="w-full pb-5 border-[.1rem] bg-[#ffffffc6] border-[#dbd8d8]">
          <div className="w-full max-w-full overflow-hidden px-4 py-2">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="font-medium mb-1" htmlFor="first_name">
                  First Name
                </label>
                <div>
                  <input
                    style={{ fontSize: "1rem" }}
                    type="text"
                    id="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="rounded-md border-[.1rem] px-1 border-[#dbd8d8] h-9 w-full focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="font-medium mb-1" htmlFor="last_name">
                  Last Name
                </label>
                <div>
                  <input
                    style={{ fontSize: "1rem" }}
                    type="text"
                    id="last_name"
                   value={formData.last_name}
                    onChange={handleChange}
                    className="rounded-md border-[.1rem] px-1 border-[#dbd8d8] h-9 w-full focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <div>
                  <input
                    style={{ fontSize: "1rem" }}
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-md border-[.1rem] px-1 border-[#dbd8d8] h-9 w-full focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="font-medium mb-1" htmlFor="phone">
                  Phone
                </label>
                <div>
                  <input
                    style={{ fontSize: "1rem" }}
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="rounded-md border-[.1rem] px-1 border-[#dbd8d8] h-9 w-full focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="font-medium mb-1" htmlFor="address">
                  Address
                </label>
                <div>
                  <textarea
                    style={{ fontSize: "1rem" }}
                    id="address"
                    value={formData.address}
                  onChange={handleChange}
                    className="rounded-md h-20 border-[.1rem] px-1 border-[#dbd8d8] w-full focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
                  />
                </div>
              </div>

              <div className="mb-3">
    <label className="font-medium mb-1" htmlFor="profile_pic">
    Profile Picture
    </label>
    <div>
    <input
      type="file"
      id="profile_pic"
      accept="image/*"
      onChange={handleChange}
     className="w-64 rounded px-3 text-sm bg-gray-300"
     />
</div>
</div>

              <hr />
              <div className="flex gap-3">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-2 py-1 text-white " style={{borderRadius:"5px"}}>Submit</button>
                <Link to='/' className="text-black">
                <button className="border-[.1rem] border-[#84818145] px-2 py-1 hover:bg-[grey] hover:text-white " style={{borderRadius:"5px"}}>Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );


}

export default EditContact
