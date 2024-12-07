import React from 'react';



const DishItem= ({ name, description, price }) => (
  <div className="flex flex-col md:flex-row justify-between items-start mb-4 border-b border-gray-300 pb-2 max-w-md mx-auto">
    <div>
      <h2 className="font-bold text-xl md:text-2xl">{name}</h2>
      <p className="pt-2 text-sm md:text-base">{description}</p>
    </div>
    <div className="text-yellow-500 pt-2 text-lg md:text-xl">{price}</div>
  </div>
);

export default DishItem;