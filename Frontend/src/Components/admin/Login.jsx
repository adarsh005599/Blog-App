// pages/admin/Login.jsx

import React, { useState } from 'react';
import { useAppContext } from '../../context/Appcontext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { axios, setToken } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please enter both email and password.");
    }

    try {
      const { data } = await axios.post('/api/admin/login', { email, password });

      if (data.success) {
        setToken(data.token); // set in context and localStorage
        toast.success('Login successful');
        navigate('/admin'); // ✅ Go to dashboard or protected route
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-sm p-6 border border-primary/30 shadow-xl rounded-lg bg-white">
        <div className="flex flex-col items-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin </span>Login
            </h1>
            <p className="font-light text-gray-600">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 w-full text-gray-700">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-gray-300 p-2 mb-4 outline-none"
              placeholder="your email id?"
            />

            <label className="block mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-gray-300 p-2 mb-6 outline-none"
              placeholder="your password?"
            />

            <button
              type="submit"
              className="w-full py-3 font-medium bg-primary text-white rounded hover:bg-primary/90 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
