// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import AdminPanel from './admin/Adminpanel';
// import SuperAdminLogin from './admin/superadminLogin';
// import { UserProvider } from './admin/context';
// import UserProfile from './components/womentalent/profileFulldetails';
// import PostCreator from './components/blogs/createblogs';

// function App() {
//   const isAdmin = localStorage.getItem('isadmin') === 'true';

//   return (
//     <UserProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<SuperAdminLogin />} />
//           <Route path="/admin-panel/CreatenewBlog" element={<PostCreator/>}/> 

//           {/* Handle access directly */}
//           <Route
//             path="/admin-panel"
//             element={isAdmin ? <AdminPanel /> : <Navigate to="/login" replace />}
//           />
//            <Route path="/admin-panel/user/:id" element={<UserProfile />} />

//           {/* Redirect unknown routes */}
//           <Route path="*" element={<Navigate to={isAdmin ? "/admin-panel" : "/login"} />} />
//         </Routes>
//       </Router>
//       <ToastContainer />
//     </UserProvider>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminPanel from "./admin/Adminpanel";
import SuperAdminLogin from "./admin/superadminLogin";
import { UserProvider } from "./admin/context";
import UserProfile from "./components/womentalent/profileFulldetails";
import PostCreator from "./components/blogs/createblogs";
import BlogList from "./components/blogs/getblogs";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isadmin") === "true";
  return isAdmin ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<SuperAdminLogin />} />

          {/* All Admin Routes Protected */}
          <Route
            path="/admin-panel"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-panel/CreatenewBlog"
            element={
              <ProtectedRoute>
                <PostCreator />
              </ProtectedRoute>
            }
          />
           <Route
            path="/admin-panel/GetAllBlogs"
            element={
              <ProtectedRoute>
                <BlogList />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin-panel/user/:id"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      <ToastContainer />
    </UserProvider>
  );
}

export default App;
