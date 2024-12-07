import React from 'react';
import Dishes from './dishes';


const StarterSection = ({ title, dishes }) => {


  return (
    <div>
      <div
        className="pt-[50px] relative w-full h-[200px] bg-cover bg-center"
        style={{ backgroundImage: `url('/images.png')` }}
      >
        <div className="absolute bottom-5 left-5">
          <h1 className="text-4xl text-white uppercase font-bold bg-opacity-50 px-4 py-2">
            {title}
          </h1>
        </div>
      </div>
      <Dishes dishes={dishes}></Dishes>
    </div>
  );
};

export default StarterSection;