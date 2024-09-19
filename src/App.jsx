import React, {useState} from 'react';

import Header from './Components/Header';


import { motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeProvider';
import MouseTrail from './Components/MouseTrail';
import Dashboard from './Components/Dashboard';


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <ThemeProvider>
      <div className="flex font-poppins bg-blue-100 dark:bg-black min-h-screen dark:text-white">
        {/* <Sidebar /> */}
        <motion.div 
          className="flex-1 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
         <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="md:px-6 px-2 space-y-1">
          <Dashboard searchTerm={searchTerm} />
            
            
          </div>
          <MouseTrail/>
        </motion.div>
      </div>
    </ThemeProvider>
  );
};

export default App;
