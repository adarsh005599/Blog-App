import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaArrowUp } from 'react-icons/fa';

const Fottar = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  return (
    <footer className="relative bg-gradient-to-r from-white via-[#f9f9ff] to-white text-gray-700 py-16 mt-24 font-outfit border-t border-gray-200">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
          <img src={assets.logo} alt="Quickblog Logo" className="w-28 mb-4" />
          <p className="text-sm leading-relaxed">
            Showcase your stories, connect worldwide,<br /> and elevate your voice. Join us today!
          </p>
          <p className="text-sm mt-3 text-gray-500">📞 Call us: +91 xxxxxxx</p>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
          <h4 className="text-gray-800 font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {['About', 'Blogs', 'Features', 'FAQs'].map((link, i) => (
              <li key={i}>
                <a href="#" className="hover:text-primary transition-colors duration-200">{link}</a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
          <h4 className="text-gray-800 font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Email: <a href="mailto:adarshsingh005599@gmail.com" className="text-primary hover:underline">adarshsingh005599@gmail.com</a></li>
            <li>Support: Above email</li>
            <li><a href="#" className="hover:text-primary">Help Center</a></li>
            <li><a href="#" className="hover:text-primary">Careers</a></li>
          </ul>
        </motion.div>

        {/* Newsletter + Social */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
          <h4 className="text-gray-800 font-semibold mb-3">Stay Updated</h4>
          <form className="flex items-center gap-2 mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-full p-2 px-4 bg-white border border-gray-300 text-sm outline-none"
              required
            />
            <button
              type="submit"
              className="bg-primary hover:scale-105 transition-transform text-white px-5 py-2 rounded-full text-sm"
            >
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-primary" title="Facebook"><FaFacebookF /></a>
            <a href="#" className="hover:text-primary" title="Twitter"><FaTwitter /></a>
            <a href="#" className="hover:text-primary" title="Instagram"><FaInstagram /></a>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-12 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} <span className="font-medium text-gray-600">Quickblog</span>. All rights reserved.
      </div>

      {/* Scroll to top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary text-white p-2 rounded-full shadow-md hover:scale-110 transition-all z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}
    </footer>
  );
};

export default Fottar;
