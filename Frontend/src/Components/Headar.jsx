import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/Appcontext';
import toast from 'react-hot-toast';

const Headar = () => {
  const { input, setInput } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    toast.success('Search submitted!');
  };

  const onClear = () => {
    setInput('');
    inputRef.current.value = '';
    toast.success('Search cleared!');
    inputRef.current.focus();
  };

  const startVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition(); // Chrome only
    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      inputRef.current.value = speechText;
      setInput(speechText);
      toast.success('Voice input captured!');
    };
    recognition.start();
  };

  return (
    <div className="relative px-6 py-24 text-center text-gray-700">
      <motion.img
        src={assets.gradientBackground}
        alt="BG"
        className="absolute top-0 left-0 w-full opacity-30 -z-10 blur-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1.2 }}
      />

      <motion.h1
        className="text-4xl  sm:text-6xl font-bold"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Your own <span className="text-primary">blogging</span> <br /> platform
      </motion.h1>

      <motion.p
        className="mt-4 max-w-xl mx-auto text-sm sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
       Unleash your thoughts, Explore your ideas, Find your next spark and your story starts here!!
      </motion.p>

      <motion.form
        onSubmit={onSubmitHandler}
        className="mt-8 max-w-xl mx-auto flex items-center gap-2 border border-gray-300 bg-white rounded-full shadow px-4 py-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for blogs..."
          className="flex-grow bg-transparent outline-none text-sm sm:text-base"
        />
        <button type="button" onClick={startVoiceInput} className="text-gray-500 text-sm">
          🎤
        </button>
        <motion.button
          type="submit"
          className="bg-primary text-white px-4 py-1.5 rounded-full text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </motion.form>

      {input && (
        <motion.button
          onClick={onClear}
          className="mt-4 border text-amber-700 text-xs px-3 py-1 rounded shadow-sm hover:bg-amber-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          Clear Search
        </motion.button>
      )}
    </div>
  );
};

export default Headar;
