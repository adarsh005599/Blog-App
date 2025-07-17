import React from 'react';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';

const CommentTableItem = ({ comment, fetchComments, index }) => {
  const { blog, createdAt, name, content, isApproved } = comment;
  const BlogDate = new Date(createdAt);

  return (
    <tr className="border-y border-gray-300 text-sm align-top">
      <th className="px-4 py-4 text-gray-700">{index}</th>

      <td className="px-4 py-4">
        <p>
          <b className="text-gray-600">Blog</b>: {blog.title}
        </p>
        <p>
          <b className="text-gray-600">Name</b>: {name}
        </p>
        <p>
          <b className="text-gray-600">Comment</b>: {content}
        </p>
      </td>

      <td className="px-4 py-4 max-sm:hidden whitespace-nowrap">
        {BlogDate.toLocaleDateString()}
      </td>

      <td className="px-4 py-4">
        <div className="flex gap-3 items-center">
          {!isApproved ? (
            <motion.img
              whileHover={{ scale: 1.2, rotate: 8 }}
              whileTap={{ scale: 0.9 }}
              src={assets.tick_icon}
              alt="approve"
              className="w-5 h-5 cursor-pointer"
              onClick={() => {}} // Placeholder for approve action
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs px-3 py-1 rounded-full bg-green-100 border border-green-600 text-green-600"
            >
              Approved
            </motion.div>
          )}

          <motion.img
            whileHover={{ scale: 1.2, rotate: -8 }}
            whileTap={{ scale: 0.9 }}
            src={assets.bin_icon}
            alt="delete"
            className="w-5 h-5 cursor-pointer"
            onClick={() => {}} // Placeholder for delete action
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
