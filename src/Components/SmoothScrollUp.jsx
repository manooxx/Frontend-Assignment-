import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { setDashboardData } from '../slices/categoriesSlice';

const SmoothScrollUp = ({ onClose }) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedWidgets, setSelectedWidgets] = useState([]);

    useEffect(() => {
        const defaultCategory = categories.find(category => category.id === 1);
        setSelectedCategory(defaultCategory);
        if (defaultCategory) {
            const widgetIds = defaultCategory.widgets.map(widget => widget.id);
            setSelectedWidgets(widgetIds);
        }
    }, [categories]);

    const handleCategorySelect = (categoryId) => {
        const selected = categories.find(category => category.id === categoryId);
        setSelectedCategory(selected);
        const widgetIds = selected ? selected.widgets.map(widget => widget.id) : [];
        setSelectedWidgets(widgetIds);
    };

    const handleWidgetToggle = (widgetId) => {
        if (selectedWidgets.includes(widgetId)) {
            setSelectedWidgets(selectedWidgets.filter(id => id !== widgetId));
        } else {
            setSelectedWidgets([...selectedWidgets, widgetId]);
        }
    };

    const handleSubmit = () => {
        if (!selectedCategory) return;
        const updatedCategories = categories.map(category => {
            if (category.id === selectedCategory.id) {
                const updatedWidgets = selectedCategory.widgets.filter(widget =>
                    selectedWidgets.includes(widget.id)
                );
                return { ...category, widgets: updatedWidgets };
            }
            return category;
        });
        console.log('Updated Categories:', updatedCategories); // Debugging log
        dispatch(setDashboardData(updatedCategories));
        onClose();
    };

    return (
        <motion.div
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '100vh' }}
            transition={{ type: 'spring', stiffness: 70, damping: 20 }}
            className="fixed right-0 top-0 dark:bg-[#0F0F0F] text-sm shadow-lg bg-white dark:text-white text-black flex flex-col w-1/2 h-full"
        >
            <div className="flex justify-between p-4 dark:bg-[#232D3F] text-white items-center mb-4 bg-blue-800">
                <h3>Add Widgets</h3>
                <button className='text-lg font-bold' onClick={onClose}>
                    <RxCross2 />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-4 font-semibold text-sm dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r from-pink-500 to-violet-500">
                    <p>Personalize your dashboard by adding or removing widgets</p>
                </div>
                <div className="px-4 flex gap-5 items-center">
                    {categories.map((category) => (
                        <span
                            key={category.id}
                            onClick={() => handleCategorySelect(category.id)}
                            className={`cursor-pointer ${selectedCategory && selectedCategory.id === category.id ? 'border-b-2 border-violet-500' : ''}`}
                        >
                            {category.categoryName}
                        </span>
                    ))}
                </div>
                <div className="w-full border my-4"></div>
                {selectedCategory && (
                    <div className="px-4 pt-4">
                        {selectedCategory.widgets.length > 0 ? (
                            selectedCategory.widgets.map(widget => (
                                <div key={widget.id} className="flex gap-2 border p-1 rounded-md items-center mb-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedWidgets.includes(widget.id)}
                                        onChange={() => handleWidgetToggle(widget.id)}
                                        className="w-4 h-4"
                                    />
                                    <div>
                                        <h6>{widget.widgetName}</h6>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No widgets available in this category.</p>
                        )}
                    </div>
                )}
            </div>
            <div className="flex justify-end items-center gap-5 px-4 py-4">
                <button onClick={onClose} className='hover:shadow-xl dark:shadow-[0_0_10px_theme("colors.purple.700")] dark:hover:shadow-[0_0_20px_theme("colors.purple.700")] dark:hover:text-transparent dark:bg-clip-text dark:hover:shadow-neon dark:bg-gradient-to-r from-pink-500 to-violet-500 bg-gray-800 text-white h-8 duration-300 cursor-pointer w-[100px] px-2 rounded-xl text-xs font-semibold p-1 flex items-center justify-center'>Cancel</button>
                <button onClick={handleSubmit} className='hover:shadow-xl dark:shadow-[0_0_10px_theme("colors.purple.700")] dark:hover:shadow-[0_0_20px_theme("colors.purple.700")] dark:hover:text-transparent dark:bg-clip-text dark:hover:shadow-neon dark:bg-gradient-to-r from-pink-500 to-violet-500 bg-gray-800 text-white h-8 duration-300 cursor-pointer w-[100px] px-2 rounded-xl text-xs font-semibold p-1 flex items-center justify-center'>Submit</button>
            </div>
        </motion.div>
    );
};

export default SmoothScrollUp;
