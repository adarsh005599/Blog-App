import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { format, formatDistanceToNow } from 'date-fns';
import Fottar from '../Components/Fottar';
import Loader from '../Components/Loader';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [toc, setToc] = useState([]);

  const fetchBlogData = async () => {
    try {
      const res = await axios.get(`/api/blog/${id}`);
      res.data.success ? setData(res.data.blog) : toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.post('/api/blog/comments', { blogId: id });
      res.data.success ? setComments(res.data.comments) : toast.error(res.data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/blog/addcomment', { blogId: id, name, content });
      if (res.data.success) {
        toast.success(res.data.message);
        setName('');
        setContent('');
        fetchComments();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  useEffect(() => {
    if (data?.description) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.description, 'text/html');
      const headings = [...doc.querySelectorAll('h1, h2, h3')];
      const tocItems = headings.map((heading, i) => ({
        id: `heading-${i}`,
        text: heading.textContent,
        level: heading.tagName,
      }));
      setToc(tocItems);
    }
  }, [data]);

  useEffect(() => {
    if (data?.description) {
      setTimeout(() => {
        const container = document.querySelector('.rich-text');
        if (container) {
          const headings = container.querySelectorAll('h1, h2, h3');
          headings.forEach((heading, index) => {
            heading.id = `heading-${index}`;
          });
        }
      }, 100);
    }
  }, [data]);

  return data ? (
    <motion.div
      className="relative font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Navbar />

      <div className="bg-[#fefcf9] dark:bg-[#e3e5eb] min-h-screen text-black dark:text-black px-4 sm:px-8">
        <div className="text-center pt-20 pb-6">
          <p className="text-sm text-[#ff7e5f] dark:text-[#dd5a5a]">
            Published on {format(new Date(data.createdAt), 'MMMM dd, yyyy')}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold max-w-3xl mx-auto mt-4 leading-tight">
            {data.title}
          </h1>
          <p className="text-lg dark:text-[#dd5a5a] max-w-xl mx-auto mt-2">
            {data.subTitle}
          </p>
        </div>
        <div className="max-w-xl mx-auto mt-6">
  <p className="text-lg text-center px-4 py-2 font-semibold bg-white dark:bg-[#1f2431] 
                text-[#333] dark:text-[#9f8bff] 
                rounded-lg shadow-md 
                border-2 border-transparent 
                bg-clip-padding 
                border-gradient-to-r from-[#a18cd1] via-[#fbc2eb] to-[#fad0c4] 
                dark:border-gradient-to-r dark:from-[#765add] dark:via-[#4e54c8] dark:to-[#2c3e50] 
                animate-fadeIn">
    Adarsh Singh 
  </p>
</div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 my-10">
          {/* Table of Contents */}
          <aside className="md:w-1/4 hidden md:block sticky top-28 h-fit bg-white/20 dark:text-[#dd5a5a]  p-5 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Table of Contents</h3>
            <ul className="space-y-3 text-sm">
              {toc.map((item, i) => (
                <li key={i}>
                  <a href={`#${item.id}`} className="hover:text-primary transition-colors duration-200">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Blog Content */}
          <div className="md:w-3/4 w-full">
            <motion.img
              src={data.image}
              alt="cover"
              className="rounded-xl w-full mb-6 shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
            <div
              className="rich-text prose lg:prose-xl max-w-none dark:prose-invert prose-a:text-blue-600 dark:prose-a:text-blue-400"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        </div>

        {/* Comments Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
          <div className="space-y-4">
            {comments.map((c, i) => (
              <motion.div
                key={i}
                className="p-4 bg-white dark:bg-[#e9ebf0] rounded-xl border dark:border-gray-700 shadow"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <img src={assets.user_icon} className="w-6 h-6" alt="user" />
                  <p className="font-semibold">{c.name}</p>
                </div>
                <p className="ml-9 text-sm">{c.content}</p>
                <div className="text-xs text-right text-white mt-2">
                  {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add Comment */}
          <form onSubmit={addComment} className="space-y-4 mt-10">
            <h3 className="text-xl font-semibold">Add a Comment</h3>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border dark:border-gray-600 bg-white  outline-none"
              required
            />
            <textarea
              placeholder="Your comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 h-32 rounded-lg border dark:border-gray-600 bg-white outline-none"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-2 rounded-full shadow hover:opacity-90 transition"
            >
              Submit
            </motion.button>
          </form>
        </div>

        {/* Next/Previous */}
        <div className="max-w-5xl mx-auto flex justify-between items-center my-16 text-sm font-medium">
          <Link to={`/blog/${parseInt(id) - 1}`} className="text-blue-600 hover:underline">
            ← Previous Post
          </Link>
          <Link to={`/blog/${parseInt(id) + 1}`} className="text-blue-600 hover:underline">
            Next Post →
          </Link>
        </div>
      </div>

      <Fottar />
    </motion.div>
  ) : (
    <Loader />
  );
};

export default Blog;
