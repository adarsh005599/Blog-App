import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <div className="my-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto"
      >
        <h1 className="text-2xl md:text-4xl font-semibold text-gray-700 ">
          Never Miss a Blog!
        </h1>
        <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400">
          Subscribe to get the latest blogs, tech updates, and exclusive news.
        </p>

        <form className="flex w-full mt-4">
          <input
            type="email"
            placeholder="Enter your email address"
            required
            className="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] text-gray-700 dark:text-gray-200 rounded-l-full outline-none"
          />
          <button
            type="submit"
            className="px-6 md:px-10 bg-primary hover:bg-primary/90 text-white font-medium text-sm rounded-r-full transition-all"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Newsletter;
