import React, { useEffect ,useState } from 'react'
import { Link,useNavigate,useParams } from "react-router-dom";
import axios from 'axios';

function ViewContact() {
  const navigate = useNavigate();
  const { id } = useParams();

function checkAuth(){
  const token = localStorage.getItem('token');
  if(!token){
  navigate('/register');
  }
  return token;
}
const token=checkAuth();


const [contact, setContact] = useState(null);

const handleDelete = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:5000/api/contact/${id}`,{
      headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${token}` },

    });
    alert("Contact deleted successfully");
    console.log("Navigating to home...");
    navigate("/"); 
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
};



useEffect(() => {
  axios
    .get(`http://localhost:5000/api/contact/${id}`,{
      headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${token}` },
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
}, [id, navigate,token]);


 return (
    <div className="bg-[#f2f0f0d0] flex mx-auto items-center h-[100vh] w-[98.5vw] ">
      <div className="mx-auto  rounded-t-md flex-col min-h-[70%] h-[75%] justify-center items-center w-[60%] ">
        <div className="border-[.1rem] border-[#dbd8d8] bg-[#435D7D] flex px-10 py-4 text-white justify-between rounded-t-md">
          <div>
            <h5 className="uppercase text-[1.7rem] font-serif">
              Contact Details
            </h5>
          </div>
        </div>

        <div className="w-full pb-5 border-[.1rem] border-[#dbd8d8]">
          <div className="w-full max-w-full overflow-hidden">

 <form className="max-w-3xl pb-2 w-full mx-auto px-6  bg-white shadow-md rounded-md">
  {contact ? (
    <>
      {/* Image */}
      <div className="flex justify-center mb-6">
        <img
          src={`http://localhost:5000/uploads/${contact.profile_pic}`}
          alt="Profile"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-500 shadow"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150?text=No+Image";
          }}
        />
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <label className="block font-semibold text-gray-700">First Name</label>
          <p className="text-gray-600 border px-3 py-2 rounded mt-1">{contact.first_name}</p>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Last Name</label>
          <p className="text-gray-600 border px-3 py-2 rounded mt-1">{contact.last_name}</p>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Email</label>
          <p className="text-gray-600 border px-3 py-2 rounded mt-1 break-all">{contact.email}</p>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Phone</label>
          <p className="text-gray-600 border px-3 py-2 rounded mt-1">{contact.phone}</p>
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold text-gray-700">Address</label>
          <p className="text-gray-600 border px-3 py-2 rounded mt-1">{contact.address}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Link to={`/editcontact/${id}`}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 shadow-sm rounded">
            Edit
          </button>
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-sm"
        >
          Delete
        </button>

        <Link to="/">
          <button className="border border-gray-400 hover:bg-gray-300 px-4 py-2 rounded text-black shadow-sm">
            Cancel
          </button>
        </Link>
      </div>
    </>
  ) : (
    <p className="text-center text-gray-500">Loading...</p>
  )}
</form>



          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewContact
