import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useAppContext } from '../context/Appcontext';

const Navbar = () => {
  
  const {navigate, token} = useAppContext()


  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav className="bg-gradient-to-r from-white via-[#f9f9ff] to-white shadow-md py-4 px-6 sm:px-16 xl:px-28 flex justify-between items-center z-50 relative">
      {/* Logo */}
      <motion.img
        src={assets.logo}
        alt="Quickblog Logo"
        onClick={() => navigate('/')}
        className="w-28 sm:w-40 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />

      {/* Desktop Login Button */}
      <div className="hidden sm:flex items-center gap-6">
        <motion.button
          onClick={() => navigate('/admin')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all shadow-md"
        >
         {token? 'Dashboard' : 'Login'}
          <img src={assets.arrow} alt="Arrow" className="w-3" />
        </motion.button>
      </div>

      {/* Hamburger for Mobile */}
      <div className="sm:hidden z-50">
        <button onClick={toggleMenu} className="text-gray-800 text-2xl">
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-white px-6 py-6 flex flex-col items-start gap-4 sm:hidden shadow-lg rounded-b-xl"
          >
            <button
              onClick={() => {
                navigate('/admin');
                setMenuOpen(false);
              }}
              className="bg-primary text-white px-6 py-2 rounded-full w-full text-left font-medium shadow-sm"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate('/');
                setMenuOpen(false);
              }}
              className="text-gray-700 px-6 py-2 rounded w-full text-left hover:bg-primary/5 hover:text-primary transition-all font-medium"
            >
              Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
