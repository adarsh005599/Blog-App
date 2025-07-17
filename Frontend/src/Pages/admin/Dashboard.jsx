import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import BlogTable from '../../Components/BlogTable';
import { useAppContext } from '../../context/Appcontext';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  });

  const {token,axios} = useAppContext();
const fetchDashboard = async () => {
  try {
    const token = localStorage.getItem("token"); // ✅ Define token

    if (!token) {
      toast.error("Token not found. Please log in again.");
      return;
    }

    const { data } = await axios.get("http://localhost:8000/api/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Correct way to pass token
      },
    });

    data.success ? setDashboard(data.dashBoard) : toast.error(data.message);
  } catch (error) {
    toast.error(error.message);
  }
};

  useEffect(() => {
    fetchDashboard();
  }, []); 

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* Top Stats */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboard.blogs}</p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboard.comments}</p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboard.drafts}</p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      {/* Recent Blogs Table */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} />
          <p>Latest Blogs</p>
        </div>
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th className="px-2 py-4">#</th>
                <th className="px-2 py-4">Blog Title</th>
                <th className="px-2 py-4 max-sm:hidden">Date</th>
                <th className="px-2 py-4 max-sm:hidden">Status</th>
                <th className="px-2 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.recentBlogs.map((blog, index) => (
                <BlogTable key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
