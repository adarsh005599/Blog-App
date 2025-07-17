import React, { useEffect, useState } from 'react';
import { comments_data } from '../../assets/assets';
import CommentTableItem from './CommentTableItem';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');

  const fetchComments = async () => {
    setComments(comments_data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-5xl">
        <h1 className="text-xl font-semibold text-gray-700">Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs font-medium 
              ${filter === 'Approved' ? 'text-primary border-primary' : 'text-gray-700 border-gray-300'}`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('Not Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs font-medium 
              ${filter === 'Not Approved' ? 'text-primary border-primary' : 'text-gray-700 border-gray-300'}`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative max-w-5xl overflow-x-auto mt-6 bg-white shadow rounded-lg">
        <table className="w-full text-sm text-gray-700">
          <thead className="text-xs text-left uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Blog Title & Comments</th>
              <th className="px-4 py-3 max-sm:hidden">Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {comments
              .filter((comment) =>
                filter === 'Approved' ? comment.isApproved : !comment.isApproved
              )
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
