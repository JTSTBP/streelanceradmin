// src/context/UserContext.js
import { createContext, useState, useEffect } from "react";
import Backendurl from "../config";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [womenUsers, setWomenUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [blogs,setBlogs]=useState([])
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${Backendurl}/admin/registered-users`)
      .then((res) => res.json())
      .then((data) => setWomenUsers(data))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

    // Fetch All Users
  useEffect(() => {
    fetch(`${Backendurl}/admin/allusers`)
      .then((res) => res.json())
      .then((data) => setAllUsers(data))
      .catch((err) => console.error("Error fetching all users:", err));
  }, []);

  // fetch all blogs data
   useEffect(() => {
    fetch(`${Backendurl}/admin/allblogs`)
      .then((res) => res.json())
      .then((data) => {
        const blogsData = Array.isArray(data) ? data : data.posts || [];
      setBlogs(blogsData);
      setLoading(false);
  
      })
      .catch((err) => console.error(err));
      setLoading(false);
  }, []);

 

  return (
    <UserContext.Provider value={{ womenUsers, setWomenUsers ,allUsers,
        setAllUsers,blogs,setBlogs,loading}}>
      {children}
    </UserContext.Provider>
  );
}
