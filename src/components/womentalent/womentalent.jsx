

import React from "react";
import { Link } from "react-router-dom";


const ProfileCard = ({ user, onDeleteClick }) => {
   console.log(user,"user")
  return (
    <div className="profile-card">
 
{/* 
      <div className="header">
        <div className="name-section">
          <h1>{user.personal.firstName} {user.personal.lastName}</h1>
          <span className="sub-info">
            0 Yr 0 Month • Rs. 0 • {user.personal.city}
          </span>
        </div>
        <div className="avatar">
          {user.personal.firstName.charAt(0).toUpperCase()}
        </div>
      </div> */}
<div className="header">
  <Link to={`/admin-panel/user/${user._id}`} className="name-section" style={{ textDecoration: "none", color: "inherit" }}>
    <h1>{user.personal.firstName} {user.personal.lastName}</h1>
    <span className="sub-info">
      0 Yr 0 Month • Rs. 0 • {user.personal.city}
    </span>
  </Link>
  <Link to={`/admin-panel/user/${user._id}`} className="avatar">
    {user.personal.firstName.charAt(0).toUpperCase()}
  </Link>
</div>

      <div className="current-role">
        <strong>Current:</strong>{" "}
        <span className="highlight">{user.professional.roles[0] || "Fresher"}</span>{" "}
        | {user.preferences?.experience || "Fresher"}
      </div>

      <div className="education">
        <p>{user.professional.education} | {user.professional.industries?.[0] || ""}</p>
        <p>{user.personal.city}, {user.personal.country}</p>
      </div>

      <div className="location">
        <strong>Pref. Location:</strong> {user.personal.city}
      </div>

      <div className="tags">
        {[...(user.professional.skills || []), ...(user.professional.industries || []), ...(user.deiIdentities || [])]
          .slice(0, 10)
          .map((tag, i) => (
            <span className="tag" key={i}>{tag}</span>
          ))}
      </div>

      <p className="may-know">
        May also know: {user.professional.skills?.slice(0, 4).join(", ") || "NA"}...
      </p>

      <div className="footer-info">
        <span>Updated: {new Date(user.createdAt).toLocaleDateString()}</span>
        <span>Active: {new Date().toLocaleDateString()}</span>
      </div>

        <div className="actions" style={{ marginTop: "10px" }}>
        <button
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer"
          }}
          onClick={() => onDeleteClick(user._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
