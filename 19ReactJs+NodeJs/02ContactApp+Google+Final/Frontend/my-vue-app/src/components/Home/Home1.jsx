import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

function Home1() {
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
              return `<img src="${url}" class="w-10 h-10 rounded-full object-cover border border-blue-300 shadow-sm"/>`;
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
                  <button class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-xs rounded shadow">View</button>
                </a>
                <a href="/editcontact/${id}">
                  <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs rounded shadow">Edit</button>
                </a>
                <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs rounded shadow delete-btn" data-id="${id}">Delete</button>
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

    if (value === "") {
      tableRef.current?.clearFilter(true);
      return;
    }

    tableRef.current?.setFilter((data) => {
      const fullName = `${data.first_name || ""} ${data.last_name || ""}`.toLowerCase();
      return fullName.includes(value);
    });
  };

  const handleEmailSearch = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
      tableRef.current?.clearFilter(true);
      return;
    }

    tableRef.current?.setFilter("email", "like", value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-24">
      <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/90 border border-white/30 shadow-2xl rounded-xl p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#333] font-serif">All Contacts</h2>

          <div className="flex items-center gap-2">
            <Link to="/addcontact">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold shadow-md transition">
                + Add New
              </button>
            </Link>

            <div className="relative">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-700 transition"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Download ▼
              </button>
              {showDropdown && (
                <div className="absolute z-50 right-0 mt-2 w-44 bg-white border border-blue-200 rounded shadow-lg">
                  {["csv", "json", "xlsx", "pdf", "html"].map((format) => (
                    <button
                      key={format}
                      onClick={() => handleDownload(format)}
                      className="w-full text-left px-4 py-2 text-sm text-blue-900 hover:bg-blue-100 hover:text-black transition"
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid gap-4 sm:grid-cols-2 mb-6 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search by name"
            onChange={handleNameSearch}
            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Search by email"
            onChange={handleEmailSearch}
            className="w-full px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

      {/* Table or No Contact Message */}
{contacts.length === 0 ? (
  <div className="text-center text-lg text-gray-600 py-16 font-semibold">
    No contacts found.
  </div>
) : (
  <div className="overflow-x-auto border rounded-md shadow bg-white">
    <div className="min-w-[600px] w-full">
      <div id="tabulator-table" className="w-full"></div>
    </div>
  </div>
)}


      </div>
    </div>
  );
}

export default Home1;
