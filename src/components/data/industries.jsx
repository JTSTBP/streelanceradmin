import React, { useState, useEffect } from "react";
import Backendurl from "../../config"


const IndustriesAdmin = () => {
  const [industries, setIndustries] = useState([]);
  const [newIndustry, setNewIndustry] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
    const [errormessage, setErrormessage] = useState("");

  // Fetch industries
  const fetchIndustries = async () => {
    const res = await fetch(`${Backendurl}/api/data/getindustries`);
    const data = await res.json();
    setIndustries(data);
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  // Create industry
  const handleCreate = async () => {
    setErrormessage("")
    if (!newIndustry.trim()) return setErrormessage("Name is required!");
    await fetch(`${Backendurl}/admin/data/industries/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newIndustry }),
    });
    setNewIndustry("");
    fetchIndustries();
  };

  // Delete industry
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this industry?")) {
      await fetch(`${Backendurl}/admin/data/industries/${id}`, { method: "DELETE" });
      fetchIndustries();
    }
  };

  // Update industry
  const handleUpdate = async (id) => {
    if (!editName.trim()) return alert("Name is required!");
    await fetch(`${Backendurl}/admin/data/industries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    });
    setEditingId(null);
    setEditName("");
    fetchIndustries();
  };

  return (
    <div className="industriesdata-container">
      <h2>Industries Management</h2>
      {errormessage &&  <p className="error">{errormessage}</p>}
      <div className="industriesdata-create-box">
        
        <input
          type="text"
          className="industries-input"
          value={newIndustry}
          placeholder="Enter industry name"
          onChange={(e) => setNewIndustry(e.target.value)}
        />
        <button onClick={handleCreate}>Add Industry</button>
      </div>
<div className="table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Industry Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {industries.map((industry, index) => (
            <tr key={industry._id}>
              <td>{index + 1}</td>
              <td>
                {editingId === industry._id ? (
                  <input
                  className="industries-input"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  industry.name
                )}
              </td>
              <td>
                {editingId === industry._id ? (
                  <>
                    <button
                      className="industriesdata-save-btn"
                      onClick={() => handleUpdate(industry._id)}
                    >
                      Save
                    </button>
                    <button
                      className="industriesdata-cancel-btn"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="industriesdata-edit-btn"
                      onClick={() => {
                        setEditingId(industry._id);
                        setEditName(industry.name);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="industriesdata-delete-btn"
                      onClick={() => handleDelete(industry._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {industries.length === 0 && (
            <tr>
              <td colSpan="3" className="industriesdata-no-data">
                No industries found
              </td>
            </tr>
          )}
        </tbody>
      </table>
   </div>
    </div>
  );
};

export default IndustriesAdmin;
