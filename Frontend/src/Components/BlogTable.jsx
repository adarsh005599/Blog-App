import React from 'react';
import { assets } from '../assets/assets';
import '../index.css'; // Ensure this has `.btn-action`, etc. defined
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';

const BlogTable = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt, isPublished } = blog;
  const BlogDate = new Date(createdAt);
  const {axios} = useAppContext();

  const deleteBlog = async() =>{
    const confirm = window.confirm("Are you Sure to delete this blog?^_~")
    if(!confirm) return;
    try {
      const{data} = await axios.post('api/blog/delete', {id: blog._id})
      if(data.success){
        toast.success(data.message)
        await fetchBlogs()
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const togglePublish = async () =>{
    try {
         const{data} = await axios.post('api/blog/toggle', {id: blog._id})
     if(data.success){
        toast.success(data.message)
        await fetchBlogs()
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
 
  }

  return (
    <tr className='hover:bg-gray-50 transition duration-300'>
      <th className='px-2 py-4 text-sm text-gray-700 font-medium'>{index}</th>

      <td className='px-2 py-4 text-sm text-gray-800'>{title}</td>

      <td className='px-2 py-4 max-sm:hidden text-sm text-gray-600'>
        {BlogDate.toDateString()}
      </td>

      <td className='px-2 py-4 max-sm:hidden'>
        <span
          className={`text-sm font-semibold ${
            isPublished ? 'text-green-600' : 'text-orange-600'
          }`}
        >
          {isPublished ? 'Published' : 'Unpublished'}
        </span>
      </td>

      <td className='px-2 py-4'>
        <div className='flex items-center gap-3'>
          <button onClick= {togglePublish}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
              isPublished
                ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          
          >
            {isPublished ? 'Unpublish' : 'Publish'}
          </button>

          <img
            src={assets.cross_icon}
            alt='Delete'
            className='w-5 h-5 cursor-pointer hover:scale-110 transition-transform'
            title='Delete blog'
            onClick={deleteBlog}
          />
        </div>
      </td>
    </tr>
  );
};

export default BlogTable;
