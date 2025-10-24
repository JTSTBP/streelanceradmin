

import React, { useContext, useEffect, useState } from "react";
import Backendurl from "../../config"
import { UserContext } from "../../admin/context";


export default function BlogList() {
  const { womenUsers ,allUsers,blogs,setBlogs,loading} = useContext(UserContext);
  // const [blogs, setBlogs] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const [search, setSearch] = useState("");

  const filteredBlogs = blogs.filter(
  (blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase()) ||
    blog.content.toLowerCase().includes(search.toLowerCase())
);

//  useEffect(() => {
//     fetch(`${Backendurl}/admin/allblogs`)
//       .then((res) => res.json())
//       .then((data) => {
//         const blogsData = Array.isArray(data) ? data : data.posts || [];
//       setBlogs(blogsData);
//       setLoading(false);
//       })
//       .catch((err) => console.error(err));
//   }, []);

console.log(blogs,"b")
  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };



  if (loading) {
    return (
      <div className="blogs-loading">
        <div className="loader"></div>
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="blogs-empty">
        <img src="https://cdn-icons-png.flaticon.com/512/4076/4076507.png" alt="No blogs" />
        <p>No blogs found. Be the first to create one!</p>
      </div>
    );
  }

  const deleteBlog = async (id) => {
  if (window.confirm("Are you sure you want to delete this blog?")) {
    try {
      await fetch(`${Backendurl}/admin/delete-blog/${id}`, { method: "DELETE" });
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  }
};

  return (
    <div className="blogs-container">
      <h2 className="blogs-heading">All Blogs</h2>
        <div className="blogs-search">
        <input
          type="text"
          placeholder="Search blogs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="blogs-grid">
        { filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog) => (
          <div className="blog-card" key={blog._id}>
            <div className="blog-image">
              <img src={blog.image || "https://via.placeholder.com/600x400"} alt={blog.title} />
            </div>
            <div className="blog-content">
              <h3>{blog.title}</h3>
              <p>
                {expanded === blog._id
                  ? blog.content
                  : blog.content.length > 150
                  ? blog.content.slice(0, 150) + "..."
                  : blog.content}
              </p>
              {blog.content.length > 150 && (
                <button className="read-more" onClick={() => toggleExpand(blog._id)}>
                  {expanded === blog._id ? "Show Less" : "Read More"}
                </button>
              )}
              <button className="delete-btn" onClick={() => deleteBlog(blog._id)}>Delete</button>
            </div>
          </div>
        ))
      ):( <p>No blogs found matching your search.</p>)}
      </div>
    </div>
  );
}
