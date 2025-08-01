import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

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
  const [showDropdown, setShowDropdown] = useState(false);
  const tableRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setContacts(res.data))
      .catch((err) => console.log("Error fetching contacts:", err));
  }, [token]);

  useEffect(() => {
    if (contacts.length > 0) {
      const table = new Tabulator("#tabulator-table", {
        data: contacts,
        layout: "fitColumns",
        pagination: "local",
        paginationSize: 5,
        responsiveLayout: "collapse",
        columns: [
          { title: "#", formatter: "rownum", hozAlign: "center", width: 50 },
          {
            title: "Profile",
            field: "profile_pic",
            formatter: (cell) => {
              const img = cell.getValue();
              const url = img
                ? `http://localhost:5000/uploads/${img}`
                : "https://via.placeholder.com/40?text=N/A";
              return `<img src="${url}" class="w-10 h-10 rounded-full object-cover"/>`;
            },
            hozAlign: "center",
          },
          {
            title: "Name",
            field: "first_name",
            formatter: (cell) => {
              const data = cell.getData();
              return `${data.first_name || ""} ${data.last_name || ""}`;
            },
          },
          { title: "Email", field: "email" },
          { title: "Phone", field: "phone" },
          {
            title: "Actions",
            formatter: (cell) => {
              const id = cell.getData()._id;
              return `
                <a href="/viewcontact/${id}">
                  <button class="bg-[#26a041] text-white px-2 py-[2px] text-xs rounded hover:bg-[#336c30] transition">View</button>
                </a>
                <a href="/editcontact/${id}">
                  <button class="bg-blue-500 text-white px-2 py-[2px] text-xs rounded hover:bg-blue-600 transition">Edit</button>
                </a>
                <button class="bg-red-500 text-white px-2 py-[2px] text-xs rounded hover:bg-red-600 delete-btn transition" data-id="${id}">Delete</button>
              `;
            },
            hozAlign: "center",
          },
        ],
        rowFormatter: (row) => {
          const rowEl = row.getElement();
          const deleteBtn = rowEl.querySelector(".delete-btn");
          if (deleteBtn) {
            deleteBtn.addEventListener("click", async () => {
              const id = deleteBtn.getAttribute("data-id");
              const confirmDelete = window.confirm("Are you sure?");
              if (!confirmDelete) return;
              try {
                await axios.delete(`http://localhost:5000/api/contact/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                row.delete();
              } catch (err) {
                console.error("Delete error", err);
              }
            });
          }
        },
      });
      tableRef.current = table;
    }
  }, [contacts]);

  const handleDownload = (type) => {
    if (!tableRef.current) return;
    const table = tableRef.current;

    switch (type) {
      case "csv":
        table.download("csv", "contacts.csv");
        break;
      case "json":
        table.download("json", "contacts.json");
        break;
      case "xlsx":
        table.download("xlsx", "contacts.xlsx", { sheetName: "Contacts" });
        break;
      case "pdf":
        table.download("pdf", "contacts.pdf", {
          orientation: "portrait",
          title: "Contacts Report",
        });
        break;
      case "html":
        table.download("html", "contacts.html", { style: true });
        break;
      default:
        break;
    }
    setShowDropdown(false);
  };

  const handleNameSearch = (e) => {
    const value = e.target.value.toLowerCase();
    tableRef.current?.setFilter([
      { field: "first_name", type: "like", value },
      { field: "last_name", type: "like", value },
    ]);
  };

  const handleEmailSearch = (e) => {
    const value = e.target.value.toLowerCase();
    tableRef.current?.setFilter("email", "like", value);
  };

  return (
    <div className="bg-[#dcdcdc] flex mx-auto items-center min-h-screen w-full pt-28">
      <div className="mx-auto rounded-t-md flex-col w-[95%] max-w-[1400px]">
        {/* Header */}
        <div className="border-[.1rem] border-[#dbd8d8] mb-1 bg-[#435D7D] flex px-6 md:px-10 py-4 text-white justify-between rounded-t-md flex-wrap gap-2">
          <h2 className="uppercase text-[1.6rem] font-serif">All Contacts</h2>

          <div className="flex items-center gap-2 relative">
            <Link to="/addcontact">
              <button className="bg-[#26a041] px-4 py-2 rounded text-white text-sm md:text-[1rem] shadow hover:shadow-md hover:bg-[#2f8235] transition">
                + Add New
              </button>
            </Link>

            {/* Dropdown */}
            <div className="relative">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm shadow hover:bg-blue-700 transition"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Download ▼
              </button>
              {showDropdown && (
                <div className="absolute z-50 right-0 mt-2 w-44 bg-gray-600 border rounded shadow-md">
                  {["csv", "json", "xlsx", "pdf", "html"].map((format) => (
                    <button
                      key={format}
                      onClick={() => handleDownload(format)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-400 transition"
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

       {/* Fixed Responsive 3D Search Filters */}
<div className="bg-white/70 backdrop-blur-md px-5 md:px-10 py-4 border-b border-gray-300 shadow-inner">
  <div className="grid gap-4 sm:grid-cols-2 w-full max-w-[600px]">
    {/* Name Search */}
    <div className="relative">
      <input
        type="text"
        placeholder="Search by name"
        onChange={handleNameSearch}
        className="w-full px-4 py-2 pl-10 text-sm rounded-xl border border-gray-300 bg-white/90 shadow-[inset_2px_2px_5px_#d1d9e6,inset_-3px_-3px_5px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></span>
    </div>

    {/* Email Search */}
    <div className="relative">
      <input
        type="text"
        placeholder="Search by email"
        onChange={handleEmailSearch}
        className="w-full px-4 py-2 pl-10 text-sm rounded-xl border border-gray-300 bg-white/90 shadow-[inset_2px_2px_5px_#d1d9e6,inset_-3px_-3px_5px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></span>
    </div>
  </div>
</div>


        {/* Table */}
        <div className="w-full pb-5 border-[.1rem] border-[#dbd8d8] overflow-x-auto">
          <div className="w-full min-w-[600px]">
            <div id="tabulator-table" className="w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
