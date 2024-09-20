import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addWidget } from '../slices/categoriesSlice';

const Modal = ({ isOpen, onClose, categoryId }) => {
  const dispatch = useDispatch();
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");

  const handleAddWidget = () => {
    if (widgetName && widgetText) {
      const newWidget = { id: Date.now(), widgetName, widgetText };
      dispatch(addWidget({ categoryId, widget: newWidget }));
      setWidgetName("");
      setWidgetText("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mx-3 md:mx-0  md:w-2/5"
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          >
            <h2 className=" md:text-xl font-semibold mb-4 dark:text-gray-200">Add New Widget</h2>
            <input
              type="text"
              placeholder="Widget Name"
              className="border dark:text-black border-blue-300 p-2 mb-4 w-full rounded"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
            />
            <textarea
              placeholder="Widget Text"
              className="border border-blue-300 dark:text-black p-2 w-full rounded mb-4"
              value={widgetText}
              onChange={(e) => setWidgetText(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button
               className=' hover:shadow-xl dark:shadow-[0_0_10px_theme("colors.purple.700")] dark:hover:shadow-[0_0_20px_theme("colors.purple.700")] dark:hover:text-transparent dark:bg-clip-text dark:hover:shadow-neon dark:bg-gradient-to-r from-pink-500 to-violet-500 bg-gray-800 text-white h-8 duration-300 cursor-pointer w-[100px] px-2 rounded-xl text-xs font-semibold p-1 flex items-center justify-center'
                onClick={onClose}
              >
                Cancel
              </button>
              <button
               className='hover:shadow-xl dark:shadow-[0_0_10px_theme("colors.purple.700")] dark:hover:shadow-[0_0_20px_theme("colors.purple.700")] dark:hover:text-transparent dark:bg-clip-text dark:hover:shadow-neon dark:bg-gradient-to-r from-pink-500 to-violet-500 bg-gray-800 text-white h-8 duration-300 cursor-pointer w-[100px] px-2 rounded-xl text-xs font-semibold p-1 flex items-center justify-center'
                onClick={handleAddWidget}
              >
                Add
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
