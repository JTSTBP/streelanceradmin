import React, { useState } from 'react';
import axios from 'axios';
import './SuperAdminLogin.css';
import Backendurl from "../config"
import { toast } from "react-toastify";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${Backendurl}/admin/admin-login`, {
      email,
      password,
    });

    const data = response.data; // 

    toast.success(data.message);
    localStorage.setItem("isadmin", "true");
    localStorage.setItem("adminToken", data.token);

    window.location.href = "/admin-panel";

  } catch (error) {
    // If server sent an error message
    const message = error.response?.data?.message || "Login failed";
    toast.error(message);
 // Only shown when login fails
  }
};



  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>Admin Panel Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="admin@streelancer.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="admin-note">Authorized Admin Access Only</p>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
