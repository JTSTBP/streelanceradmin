import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Backendurl from "../config"
import { UserContext } from "../admin/context";
import { useNavigate } from "react-router-dom";


const UserList = () => {
const navigate=useNavigate()
    const { allUsers, setAllUsers } = useContext(UserContext);




  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${Backendurl}/admin/delete-user/${id}?type=${"User"}`);
         setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };
  const viewUserDetails = (id) => {
    navigate(`/admin-panel/user/${id}`);
  };

  return (
    <div className="userlist-container">
      <h1 className="userlist-title">All Users</h1>
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Job Status</th>
              <th>Google User</th>
              <th>LinkedIn User</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length > 0 ? (
              allUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.fullName || "—"}</td>
                  
                  <td>{user.email}</td>
                  <td>{user.gender || "—"}</td>
                  <td>{user.jobStatus || "—"}</td>
                  <td>{user.isGoogleUser ? "Yes" : "No"}</td>
                  <td>{user.isLinkedInUser ? "Yes" : "No"}</td>
                  <td>
                    
                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
