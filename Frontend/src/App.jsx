import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Blog from './Pages/Blog';
import Home from './Pages/Home';
import Layout from './Pages/admin/Layout';
import Dashboard from './Pages/admin/Dashboard';
import Addblog from './Pages/admin/Addblog';
import Comments from './Pages/admin/Comments';
import Listblog from './Pages/admin/Listblog';
import Login from './Components/admin/Login';
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/Appcontext';
import 'quill/dist/quill.snow.css'

const App = () => {
  const {token} = useAppContext();
  return (
    <div>
      <Toaster/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:id" element={<Blog />} />

      {/* Admin layout with nested routes */}
      <Route path="/admin" element={token?<Layout />: <Login/>}>
        <Route index element={<Dashboard />} />
        <Route path="addblog" element={<Addblog />} />
        <Route path="listblog" element={<Listblog />} />
        <Route path="comments" element={<Comments />} />
      </Route>
    </Routes>
    </div>
  );
};

export default App;
