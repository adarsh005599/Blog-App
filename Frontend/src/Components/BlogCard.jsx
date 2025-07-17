import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  if (!blog) return null; // 🛡️ Prevents rendering if blog is undefined

  const { title, description, category, image, _id } = blog;

  return (
    <motion.div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-2xl overflow-hidden shadow-md bg-white cursor-pointer transition-transform"
      whileHover={{ scale: 1.025, boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Blog Image */}
      <img
        src={image}
        alt={title}
        className="aspect-video w-full object-cover rounded-t-2xl"
      />

      {/* Category Tag */}
      <div className="px-5 pt-4">
        <span className="inline-block bg-primary/20 text-primary text-xs px-3 py-1 rounded-full mb-2">
          {category}
        </span>
      </div>

      {/* Title and Description */}
      <div className="px-5 pb-5">
        <h5 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 mb-1">
          {title}
        </h5>
        <p
          className="text-xs text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 100) }}
        />
      </div>
    </motion.div>
  );
};

export default BlogCard;
