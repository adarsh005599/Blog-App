// context/Appcontext.jsx

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  // Intercept 401/403 errors (token expired or invalid)
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;

        if ((status === 401 || status === 403) && token) {
          toast.error("Session expired, please login again.");
          setToken(null); // clear from state & storage
          navigate('/login');
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor); // clean up
    };
  }, [token]);

  // Load token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    fetchBlogs();
  }, []);

  // Sync token to Axios & localStorage
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem("token");
    }
  }, [token]);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/blog/all');
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    fetchBlogs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
