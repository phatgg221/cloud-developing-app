import React from 'react';
import DishItem from './dishesItem';



const Dishes= ({ dishes }) => {
  const firstColumn = dishes.slice(0, 3);
  const secondColumn = dishes.slice(3, 6);

  return (
    <div className="pt-[100px] pb-[100px] pl-[30px] justify-around grid grid-cols-2 gap-6">
      <div>
        {firstColumn.map((dish, index) => (
          <DishItem key={index} {...dish} />
        ))}
      </div>
      <div>
        {secondColumn.map((dish, index) => (
          <DishItem key={index} {...dish} />
        ))}
      </div>
    </div>
  );
};

export default Dishes;