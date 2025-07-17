import React, { useState } from 'react';
import { blogCategories } from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import BlogCard from './BlogCard';
import { useAppContext } from '../context/Appcontext';

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === '') return blogs;

    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div className='min-h-screen pb-24'>
      {/* Category Tabs */}
      <div className='flex justify-center gap-3 sm:gap-6 my-10 flex-wrap px-4 sm:px-0'>
        {blogCategories.map((item) => (
          <motion.div
            key={item}
            className='relative'
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <button
              onClick={() => setMenu(item)}
              className={`relative z-10 px-4 py-1.5 text-sm sm:text-base font-medium rounded-full transition-colors duration-300 ${
                menu === item ? 'text-white' : 'text-gray-500'
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId='underline'
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className='absolute inset-0 bg-primary z-[-1] rounded-full'
                />
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Blog Grid */}
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mx-6 sm:mx-14 xl:mx-28'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode='wait'>
          {filteredBlogs().map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <BlogCard blog={blog} / >
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BlogList;
