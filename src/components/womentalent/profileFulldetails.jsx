import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../admin/context";
import { FaUser, FaBriefcase, FaSlidersH, FaClock, FaFolderOpen, FaInfoCircle } from "react-icons/fa";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { womenUsers } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("professional");

  useEffect(() => {
    if (womenUsers && womenUsers.length > 0) {
      const selectedUser = womenUsers.find((u) => u._id === id);
      setUser(selectedUser);
    }
  }, [id, womenUsers]);

  const base64ToBlob = (base64, contentType = "") => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length)
      .fill()
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };

  if (!user) return <div className="loader">Loading...</div>;

  const tabs = [
    { key: "professional", label: "Professional", icon: <FaBriefcase /> },
    { key: "preferences", label: "Preferences", icon: <FaSlidersH /> },
    { key: "availability", label: "Availability", icon: <FaClock /> },
    { key: "portfolio", label: "Portfolio", icon: <FaFolderOpen /> },
    { key: "summary", label: "Summary", icon: <FaInfoCircle /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "professional":
        return (
          <div className="tab-content">
            <p><strong>Roles:</strong> {user.professional.roles?.join(", ") || "N/A"}</p>
            <p><strong>Skills:</strong> {user.professional.skills?.join(", ") || "N/A"}</p>
          </div>
        );
      case "preferences":
        return (
          <div className="tab-content">
            <p><strong>Experience:</strong> {user.preferences.experience}</p>
            <p><strong>Work Tracks:</strong> {user.preferences.workTracks?.join(", ") || "N/A"}</p>
          </div>
        );
      case "availability":
        return (
          <div className="tab-content">
            <p><strong>Work Availability:</strong> {user.availability.workAvailability}</p>
            <p><strong>Shift Preference:</strong> {user.availability.shift || "N/A"}</p>
          </div>
        );
      case "portfolio":
        return (
          <div className="tab-content">
            {user.portfolio.resume && (
              <div className="resume-preview">
                <h3>Resume</h3>
                <div className="resume-frame-container">
                  <iframe
                    src={URL.createObjectURL(
                      base64ToBlob(user.portfolio.resume.fileData, user.portfolio.resume.fileType)
                    )}
                    title="Resume Preview"
                    className="resume-frame"
                  />
                </div>
                <a
                  href={URL.createObjectURL(
                    base64ToBlob(user.portfolio.resume.fileData, user.portfolio.resume.fileType)
                  )}
                  download={user.portfolio.resume.fileName}
                  className="resume-download-btn"
                >
                  Download Resume
                </a>
              </div>
            )}
            <p><strong>LinkedIn:</strong> <a href={user.portfolio.linkedin} target="_blank" rel="noreferrer">{user.portfolio.linkedin}</a></p>
            <p><strong>Portfolio:</strong> <a href={user.portfolio.portfolio} target="_blank" rel="noreferrer">{user.portfolio.portfolio}</a></p>
          </div>
        );
      case "summary":
        return (
          <div className="tab-content">
            <p>{user.portfolio.additionalInfo || "No additional information provided."}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="user-profile-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/admin-panel")}>
        ← Back
      </button>

      <div className="user-card">
        <div className="user-left">
          <div className="user-avatar">{user.personal.firstName.charAt(0).toUpperCase()}</div>
          <div className="user-info">
            <h2>{user.personal.firstName} {user.personal.lastName}<span className="verified">✔</span></h2>
            <p className="role">
              <span className="highlight">{user.professional.roles?.join(", ") || "Role Not Provided"}</span> -{" "}
              {user.preferences.experience === "entry" ? "Fresher" : user.preferences.experience}
            </p>
            <p>Resume: {user.portfolio.resume?.fileName || "Not Uploaded"}</p>
            <div className="extra-info">
              <span>📍 {user.personal.city || "N/A"}</span>
              <span>📞 {user.personal.phone}</span>
              <span>📧 {user.personal.email}</span>
            </div>
            <p>Preferred Work: {user.preferences.workTracks?.join(", ") || "N/A"}</p>
            <p>Availability: {user.availability.workAvailability}</p>
          </div>
        </div>
        <div className="user-right">
          <a href={user.portfolio.linkedin} target="_blank" rel="noreferrer">
            <img src={require("../../images/linkdin.png")} alt="linkedin" />
          </a>
          <a href={user.portfolio.portfolio} target="_blank" rel="noreferrer">
            <img src={require("../../images/portfolio.png")} alt="portfolio" />
          </a>
        </div>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`tab-item ${activeTab === tab.key ? "active-tab" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </div>
        ))}
      </div>

      {renderTabContent()}
    </div>
  );
};

export default UserProfile;
