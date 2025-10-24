
import React, { useState, useContext, useEffect } from "react";

import { toast } from "react-toastify";
import { UserContext } from "../../admin/context";
import ProfileCard from "./womentalent";
import Backendurl from "../../config"
import axios from "axios";

export default function TalentPool() {
  const { womenUsers,setWomenUsers } = useContext(UserContext);
  const [filters, setFilters] = useState({
    city: '',
    status: '',
    experience: '',
    education: '',
  });
  const [confirmModal, setConfirmModal] = useState({ open: false, userId: null });

  const [filteredUsers, setFilteredUsers] = useState(womenUsers || []);

  useEffect(() => {
    let result = womenUsers;

    if (filters.city) {
      result = result.filter(u => u.personal?.city === filters.city);
    }
    if (filters.status) {
      result = result.filter(u => u.status === filters.status);
    }
    if (filters.experience) {
      result = result.filter(u => u.preferences?.experience === filters.experience);
    }
    if (filters.education) {
      result = result.filter(u => u.professional?.education === filters.education);
    }

    setFilteredUsers(result);
  }, [filters, womenUsers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ city: '', status: '', experience: '', education: '' });
  };

//   const onDelete = async (id) => {
   
//   try {
//     const response = await fetch(`${Backendurl}/api/delete-user/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {

//       setWomenUsers((prev) => prev.filter((user) => user._id !== id));
//      toast.success("User deleted successfully.");

//     } else {
//      toast.error("Failed to delete user.");
//     }
//   } catch (error) {
//     console.error("Delete error:", error);
//     alert("Error deleting user.");
//   } finally {
//     setConfirmModal({ open: false, userId: null });
//   }
// };


const onDelete = async (id, type) => {
  try {
    const response = await axios.delete(`${Backendurl}/admin/delete-user/${id}`, {
      params: { type }  // Send type as query param
    });

    if (response.status === 200) {
      setWomenUsers((prev) => prev.filter((user) => user._id !== id));
      toast.success("User deleted successfully.");
    } else {
      toast.error("Failed to delete user.");
    }
  } catch (error) {
    console.error("Delete error:", error);
    toast.error("Error deleting user.");
  } finally {
    setConfirmModal({ open: false, userId: null });
  }
};


  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ marginBottom: "20px" }}>Women's Talent Pool</h2>

      {/* Filter Panel */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap",justifyContent:"center" }}>
        <select name="city" value={filters.city} onChange={handleChange}>
          <option value="">All Cities</option>
          {[...new Set(womenUsers.map(u => u.personal?.city).filter(Boolean))].map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="">All Status</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
        </select>

        <select name="experience" value={filters.experience} onChange={handleChange}>
          <option value="">All Experience Levels</option>
          <option value="entry">Entry</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>

        <select name="education" value={filters.education} onChange={handleChange}>
          <option value="">All Education</option>
          <option value="diploma">Diploma</option>
          <option value="bachelor">Bachelor</option>
          <option value="master">Master</option>
        </select>

        <button onClick={resetFilters}>Clear Filters</button>
      </div>

      {/* Display Filtered Cards */}
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user, index) => <ProfileCard key={index} user={user} onDeleteClick={(id) => setConfirmModal({ open: true, userId: id, })} />
)
      ) : (
        <p>No users match your filters.</p>
      )}
      {confirmModal.open && (
  <div style={modalOverlay}>
    <div style={modalBox}>
      <p>Are you sure you want to delete this user?</p>
      <div style={{ marginTop: "10px" }}>
        <button
          style={confirmBtn}
          onClick={() => onDelete(confirmModal.userId,"RegisteredusersDetails")}
        >
          Yes, Delete
        </button>
        <button
          style={cancelBtn}
          onClick={() => setConfirmModal({ open: false, userId: null })}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}


const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalBox = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  width: "300px",
};

const confirmBtn = {
  marginRight: "10px",
  padding: "8px 16px",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const cancelBtn = {
  padding: "8px 16px",
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
