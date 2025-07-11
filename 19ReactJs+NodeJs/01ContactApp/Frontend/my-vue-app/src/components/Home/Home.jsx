import React, { useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import axios from "axios";

function Home() {

function checkAuth(){
const token = localStorage.getItem('token');
  if(!token){
    window.location.href = "/register";
  }
  return token;
}
const token=checkAuth();

  const [contacts, setContacts] = useState([]);

const handleDelete = async (id)=>{
 const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (!confirmDelete) return;
  try {
    await axios.delete(`http://localhost:5000/api/contact/${id}`,{
       headers: { Authorization: `Bearer ${token}` },
    })
    setContacts(prev => prev.filter(item => item._id !== id));
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
}

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contact",{
         headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setContacts(res.data))
      .catch((err) => console.log("Error fetching contacts:", err));
  }, [token]);

  return (
    <div className="bg-[#c9c7c7d3] flex mx-auto items-center h-[100vh] w-[98.5vw] ">
      <div className="mx-auto  rounded-t-md flex-col min-h-[70%] h-[75%] justify-center items-center w-[85%] ">
        <div className="border-[.1rem] border-[#dbd8d8] mb-1 bg-[#435D7D] flex px-10 py-4 text-white justify-between rounded-t-md">
          <div>
            <h2 className="uppercase text-[1.7rem] font-serif">All Contacts</h2>
          </div>
          <div>
            <Link to="/addcontact">
              <button className="bg-[#26a041] px-2 text-[1.3rem] py-1 rounded text-white">
                +Add New
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full pb-5 border-[.1rem] border-[#dbd8d8]">
          <div className="w-full max-w-full overflow-hidden">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="border border-gray-300 px-2 py-2 text-sm lg:text-xl">
                    #
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-sm lg:text-xl">
                    Profile
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-sm  lg:text-xl">
                    Name
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-sm  lg:text-xl">
                    Email
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-sm  lg:text-xl">
                    Phone
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-sm  lg:text-xl">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((contact, index) => (
                    <tr
                      key={contact._id}
                      className="even:bg-gray-300 odd:bg-white hover:bg-gray-200"
                    >
                      <td className="border border-gray-300 px-2 py-1 text-sm  lg:text-[15px]">
                        {index + 1}
                      </td>
                     <td className="border border-gray-300 px-2 py-1 text-sm lg:text-[15px]">
  {contact.profile_pic ? (
    <img
         src={`http://localhost:5000/uploads/${contact.profile_pic}`}
      alt="Profile"
      className=" w-10 h-10 rounded-full object-cover"
      onError={(e) => {
        if (!e.target.src.includes("placeholder.com")) {
          e.target.src = "https://via.placeholder.com/40?text=N/A";
        }
      }}
    />
  ) : (
    <img
      src="https://via.placeholder.com/40?text=N/A"
      alt="No Image"
      className="w-10 h-10 rounded-full object-cover"
    />
  )}
</td>


                      <td className="border border-gray-300 px-2 py-1 text-sm  lg:text-[15px]">
                        {contact.first_name} {contact.last_name}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-sm  lg:text-[15px] break-all">
                        {contact.email}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-sm  lg:text-[15px]">
                        {contact.phone}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 flex flex-wrap gap-1">
                        <Link to={`/viewcontact/${contact._id}`}>
                          <button className="bg-[#26a041] text-white px-2 py-[2px] text-xs rounded hover:bg-[#336c30]">
                            View
                          </button>
                        </Link>
                        <Link to={`/editcontact/${contact._id}`}>
                          <button className="bg-blue-500 text-white px-2 py-[2px] text-xs rounded hover:bg-blue-600">
                            Edit
                          </button>
                        </Link>
                        <button
                          className="bg-red-500 text-white px-2 py-[2px] text-xs rounded hover:bg-red-600"
                          onClick={() => handleDelete(contact._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No contacts found.
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

export default Home;
