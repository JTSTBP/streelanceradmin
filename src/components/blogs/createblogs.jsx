// import React, { useState } from "react";


// export default function PostCreator() {
//   const [content, setContent] = useState("");
//   const [title, setTitle] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setImagePreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Post Content:", content);
//     alert("Post Published!");
//   };

//   return (
//     <div className="creating-blog-container">
//       {/* Left Section */}
//       <div className="post-creator-container">
//         <h2 className="form-heading">Create New Blog</h2>

//         {/* Upload Image */}
//         <div className="upload-section">
//           <label htmlFor="fileUpload" className="upload-label">
//             {imagePreview ? (
//               <img src={imagePreview} alt="Preview" className="uploaded-img" />
//             ) : (
//               "Click to upload image"
//             )}
//           </label>
//           <input
//             type="file"
//             id="fileUpload"
//             className="file-input"
//             onChange={handleImageUpload}
//           />
//         </div>

//         {/* Blog Title */}
//         <input
//           type="text"
//           className="post-title-input"
//           placeholder="Enter blog title..."
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         {/* Blog Content */}
//         <textarea
//           className="post-textarea"
//           placeholder="Share your thoughts..."
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />

//         {/* Publish Button */}
//         <button className="publish-btn" onClick={handleSubmit}>
//           Publish Post
//         </button>
//       </div>

//       {/* Right Side Preview */}
//       <div className="preview-card">
//         <div className="preview-header">Preview</div>
//         <div className="preview-image">
//           {imagePreview ? (
//             <img src={imagePreview} alt="Preview" className="preview-img" />
//           ) : (
//             <span>600 × 400</span>
//           )}
//         </div>
//         <div className="preview-content">
//           <h3>{title || "Your heading will appear here"}</h3>
//           <p>{content || "Your content will appear here"}</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { toast } from "react-toastify";
import Backendurl from "../../config"

export default function PostCreator() {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: null
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setPostData((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
   
    e.preventDefault();
    try {
      const response = await fetch(`${Backendurl}/admin/blogpost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new Error("Failed to publish post");
      toast.success("Post Published Successfully!");
 
      handleClear();
    } catch (error) {
      console.error(error);
            toast.error("Error publishing post");
    }
  

  }

  const handleClear = () => {
    setPostData({ title: "", content: "", image: null });
    document.getElementById("fileUpload").value = "";
  };

  return (
    <div className="creating-blog-container">
      {/* Left Section */}
      <div className="post-creator-container">
        <h2 className="postform-heading">Create New Blog</h2>

        {/* Upload Image */}
        <div className="postupload-section">
          <label htmlFor="fileUpload" className="postupload-label">
            {postData.image ? (
              <img src={postData.image} alt="Preview" className="postuploaded-img" />
            ) : (
              "Click to upload image"
            )}
          </label>
          <input
            type="file"
            id="fileUpload"
            className="postfile-input"
            onChange={handleImageUpload}
          />
        </div>

        {/* Blog Title */}
        <input
          type="text"
          name="title"
          className="post-title-input"
          placeholder="Enter blog title..."
          value={postData.title}
          onChange={handleChange}
        />

        {/* Blog Content */}
        <textarea
          name="content"
          className="post-textarea"
          placeholder="Share your thoughts..."
          value={postData.content}
          onChange={handleChange}
        />
        <p className="clear-btnfrom" onClick={handleClear}>Clear All--> </p>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="publish-btn" onClick={handleSubmit}>
            Publish Post
          </button>
         
        </div>
      </div>

      {/* Right Side Preview */}
      <div className="preview-card">
        <div className="preview-header">Preview</div>
        <div className="preview-image">
          {postData.image ? (
            <img src={postData.image} alt="Preview" className="preview-img" />
          ) : (
            <span>600 × 400</span>
          )}
        </div>
        <div className="preview-content">
          <h3>{postData.title || "Your heading will appear here"}</h3>
          <p>{postData.content || "Your content will appear here"}</p>
        </div>
      </div>
    </div>
  );
}
