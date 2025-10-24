import React from "react";
import { useNavigate } from "react-router-dom";


const actions = [
  { name: "Create a New Blog",navi:"/admin-panel/CreatenewBlog" },
  { name: "Get All Existing Blogs",navi:"/admin-panel/GetAllBlogs" },
  // { name: "Delete Blogs" },
  // { name: "Search Blogs" },
];

const BlogActions = () => {
  const navigate =useNavigate()

  const handlenavigate=(navi)=>{
    navigate(navi)
  }
  return (
    <div className="blog-actions-wrapper">
      <h2 className="blog-title">Manage Your Blogs</h2>
      <div className="blog-actions-grid">
        {actions.map((action, index) => (
          <div key={index} className="blog-card" onClick={()=>navigate(action.navi)}>
            <span className="blog-arrow">&gt;</span>
            <span className="blog-text">{action.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogActions;
