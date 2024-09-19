import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import { RxCross2 } from "react-icons/rx";
import AllCategories from './AllCategories';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget, removeWidget } from '../slices/categoriesSlice';
import SmoothScrollUp from './SmoothScrollUp'; // Import SmoothScrollUp

const Dashboard = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const dashboardData = useSelector(state => state.categories.categories);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [scrollUpOpen, setScrollUpOpen] = useState(false); // State for SmoothScrollUp

  const openModal = (categoryId) => {
    setSelectedCategory(categoryId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  const handleAddWidget = (widgetName, widgetText) => {
    if (selectedCategory && widgetName && widgetText) {
      const newWidget = { id: Date.now(), widgetName, widgetText };
      dispatch(addWidget({ categoryId: selectedCategory, widget: newWidget }));
      closeModal();
    }
  };

  const openScrollUp = () => {
    setScrollUpOpen(true); // Open SmoothScrollUp
  };

  const closeScrollUp = () => {
    setScrollUpOpen(false); // Close SmoothScrollUp
  };

  const filteredCategories = dashboardData.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.widgetName.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="py-4 p-2 md:py-0 md:p-6">
      <AllCategories openScrollUp={openScrollUp} />

      {filteredCategories.map((category) => (
        <div key={category.id} className="mb-10">
          <h2 className="text-sm md:text-lg mb-4">{category.categoryName}</h2>
          <div className="grid md:grid-cols-3 gap-2 md:gap-6">
            {category.widgets.map((widget) => (
              <motion.div
                key={widget.id}
                className='bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4  relative '
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">
                  {widget.widgetName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {widget.widgetText}
                </p>
                <button
                  className="absolute top-2 right-2 text-gray-800 dark:text-white hover:scale-110 hover:font-bold duration-300"
                  onClick={() => dispatch(removeWidget({ categoryId: category.id, widgetId: widget.id }))}
                >
                  <RxCross2 />
                </button>
              </motion.div>
            ))}
            <motion.div
              className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 100 }}
              onClick={() => openModal(category.id)}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                + Add Widget
              </h3>
            </motion.div>
          </div>
        </div>
      ))}

      <Modal isOpen={modalOpen} onClose={closeModal} categoryId={selectedCategory} onSubmit={handleAddWidget} />
      {scrollUpOpen && <SmoothScrollUp onClose={closeScrollUp} />} {/* Render SmoothScrollUp if open */}
    </div>
  );
};

export default Dashboard;
