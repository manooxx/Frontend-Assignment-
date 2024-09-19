import React from 'react';
import { useDispatch } from 'react-redux';
import { addWidget } from '../slices/categoriesSlice';
import { BiRefresh } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoHistory } from "react-icons/go";
import { FaAngleDown } from "react-icons/fa";

const AllCategories = ({ openScrollUp }) => {
  const dispatch = useDispatch();

  const handleAddWidget = (categoryId) => {
    const newWidget = { id: Math.random(), widgetName: 'New Widget', widgetText: 'This is a new widget.' };
    dispatch(addWidget({ categoryId, widget: newWidget }));
  };

  return (
    <div className='flex justify-between py-4 pb-8 items-center'>
      <h1 className=" md:text-2xl font-semibold dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r from-pink-500 to-violet-500">CNAPP Dashboard</h1>
      <div className='flex items-center gap-2 text-sm'>
        <div
          onClick={openScrollUp} // Call the passed function to open SmoothScrollUp
          className='hover:shadow-xl dark:shadow-[0_0_10px_theme("colors.purple.700")] dark:hover:shadow-[0_0_20px_theme("colors.purple.700")] dark:hover:text-transparent dark:bg-clip-text dark:hover:shadow-neon dark:bg-gradient-to-r from-pink-500 to-violet-500 bg-gray-800 text-white h-8 duration-300 cursor-pointer w-[100px] px-2 rounded-xl text-xs font-semibold p-1 flex items-center justify-between'
        >
          Add Widget
          <span>+</span>
        </div>
        <div className='hidden md:block'>
          <BiRefresh className='hover:shadow-xl duration-300 cursor-pointer' />
        </div>
        <div className='hover:shadow-xl duration-300 hidden md:block'>
          <BsThreeDotsVertical className='cursor-pointer' />
        </div>
        <div className='hidden  hover:shadow-xl  dark:shadow-[0_0_10px_theme("colors.purple.700")] dark:hover:shadow-[0_0_20px_theme("colors.purple.700")] dark:hover:text-transparent dark:bg-clip-text dark:hover:shadow-neon dark:bg-gradient-to-r from-pink-500 to-violet-500 bg-gray-800 text-white h-8 duration-300 cursor-pointer w-[120px] px-2 rounded-xl text-xs font-semibold p-1 md:flex items-center justify-between'>
          <GoHistory className='' />
          View History
          <FaAngleDown/> 
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
