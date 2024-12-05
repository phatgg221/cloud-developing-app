import React from "react";
import Image from "next/image";

const Intro = () => {
  return (
    <div className="flex flex-col lg:flex-row pt-[50px] px-[20px] lg:px-[220px]">
      <div className="flex-1 max-w-full lg:max-w-md mb-8 lg:mb-0">
        <Image
          src={"/beefSteak.png"}
          width={420}
          height={416}
          alt="Beef"
          className="object-cover w-full drop-shadow-2xl"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center pl-0 lg:pl-[20px] text-center lg:text-left">
        <p className="text-2xl md:text-3xl font-bold text-black mb-4">
          Who Are We?
        </p>
        <p className="text-base md:text-lg text-gray-700">
        The mission is to deliver unique food at affordable prices and we are the people to do it. 
        </p>
        <p className="text-2xl pt-[30px] md:text-3xl font-bold text-black mb-4">
        What makes us unique?
        </p>
        <p className="text-base md:text-lg text-gray-700">
        Our menu is developed by high level chefs to deliver the best of both worlds without any compromises. 
        </p>
      </div>
    </div>
  );
};

export default Intro;