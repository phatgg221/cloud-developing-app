import React from 'react';

const DishItem = ({ name, description, price }) => (
  <div className="flex flex-col md:flex-row justify-between items-start mb-4 border-b border-gray-300 pb-2 max-w-md mx-auto relative group">
    <div>
      <h2 className="font-bold text-xl md:text-2xl">{name}</h2>
      <p className="pt-2 text-sm md:text-base">{description}</p>
    </div>
    <div className="text-yellow-500 pt-2 text-lg md:text-xl">{price}</div>
    
    {/* Buy Button */}
    <button className="absolute top-0 right-0 bg-yellow-500 text-white py-1 px-4 rounded-md opacity-0 group-hover:opacity-100 transform group-hover:translate-y-2 transition duration-300 ease-in-out">
      Order
    </button>
  </div>
);

export default DishItem;
