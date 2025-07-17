import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/Appcontext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Quill from 'quill';

const Blog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { axios, token } = useAppContext();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: '',
    subTitle: '',
    category: 'Start Up',
    publish: false,
  });

  const [descriptionHtml, setDescriptionHtml] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnail(reader.result);
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload a valid image file.");
      setThumbnail(null);
      setImageFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Session expired. Please login again.");
    console.log("Token being sent:", token);

    if (!blog.title || !blog.subTitle || !descriptionHtml || !imageFile) {
      return toast.error("All fields including image and description are required.");
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("blog", JSON.stringify({
        title: blog.title,
        subTitle: blog.subTitle,
        description: descriptionHtml,
        category: blog.category,
        isPublished: blog.publish,
      }));

      const { data } = await axios.post('/api/blog/add', formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success("Blog uploaded successfully!");
        navigate('/');
      } else {
        toast.error(data.message || "Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err.message);
      toast.error("Something went wrong during upload.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' });

      quillRef.current.on('text-change', () => {
        const html = editorRef.current.querySelector('.ql-editor')?.innerHTML;
        setDescriptionHtml(html);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-12">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-lg p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700">Add a New Blog</h2>

        {/* Upload Image */}
        <motion.div className="mb-6" whileHover={{ scale: 1.02 }}>
          <label className="block text-gray-700 font-medium mb-2">Thumbnail</label>
          <label htmlFor="imageUpload" className="border-dashed border-2 border-gray-400 p-6 rounded-md text-center cursor-pointer hover:border-blue-500">
            {thumbnail ? (
              <img src={thumbnail} alt="Preview" className="max-h-48 mx-auto rounded-md object-cover" />
            ) : (
              <p className="text-sm text-gray-500">📁 Click to upload</p>
            )}
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </motion.div>

        {/* Blog Fields */}
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:ring focus:ring-blue-500"
              placeholder="Enter blog title"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block text-gray-700 font-medium mb-1">Subtitle</label>
            <input
              type="text"
              name="subTitle"
              value={blog.subTitle}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:ring focus:ring-blue-500"
              placeholder="Enter subtitle"
            />
          </motion.div>
        </div>

        {/* Quill Editor */}
        <motion.div className="mt-6" whileHover={{ scale: 1.02 }}>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <div
            ref={editorRef}
            className="bg-white border rounded-md min-h-[200px] p-2"
          ></div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mt-6">
          <motion.div whileHover={{ scale: 1.02 }}>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              name="category"
              value={blog.category}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:ring focus:ring-blue-500"
            >
              <option>Start Up</option>
              <option>Technology</option>
              <option>Career</option>
              <option>AI</option>
            </select>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-4 mt-7">
            <input
              type="checkbox"
              name="publish"
              checked={blog.publish}
              onChange={handleChange}
              className="accent-blue-500 w-5 h-5"
            />
            <label className="text-gray-700 font-medium">Publish Immediately</label>
          </motion.div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="mt-8 px-6 py-2 rounded-md bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Add Blog"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Blog;
