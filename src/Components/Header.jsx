import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeProvider';  // Assuming ThemeProvider is used
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { BiSearch } from "react-icons/bi";

const Header = ({ searchTerm, setSearchTerm }) => {
  const { theme, toggleTheme } = useTheme();
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <motion.header 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ type: 'spring', stiffness: 60 }} 
      className="bg-white dark:bg-gray-900 shadow px-10 p-2 flex justify-between items-center"
    >
      <div className='flex gap-4 items-center'>
        <div className='w-10 h-10'>
          <img src="logo.png" alt="Logo" />
        </div>
        <div>
          <h2 className='dark:text-gray-200 font-semibold text-gray-800'>Dashboard</h2>
        </div>
      </div>
     
      <motion.div 
        className="flex items-center space-x-4" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className='border rounded-full h-9 w-60 flex items-center justify-between p-3 bg-gray-100'>
          <input 
            className='outline-none h-9 text-gray-800 rounded-full bg-gray-100' 
            type="text" 
            placeholder='Search Widget'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <BiSearch className='text-xl dark:text-gray-800' />
        </div>
        
        <div className="flex space-x-4">
          <motion.span 
            whileHover={{ scale: 1.3 }} 
            className="cursor-pointer text-xl"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <MdDarkMode /> : <MdOutlineLightMode className='text-white' />}
          </motion.span>
        </div>
        
        <p className="font-semibold flex items-center gap-1 text-gray-800 dark:text-gray-200">
          <span className='text-lg'><FaCircleUser /></span> Login
        </p>
      </motion.div>
    </motion.header>
  );
};

export default Header;
