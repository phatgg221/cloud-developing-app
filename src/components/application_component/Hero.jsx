import React from "react";
import Image from "next/image";
const Hero = () =>{
    return(
        <div className="pb-11">
            <div className="relative min-w-full lg:aspect-[197/34]">
        <Image
          src={"/fruit_desktop.png"}
          alt={"Fruit"}
          fill={true}
          className="relative blur-sm"
        />

        <div className="absolute pt-[120px] pl-[650px] text-left text-white ">
          <p className="text-5xl font-bold ml-5 lg:ml-0">
                About us
          </p>
        </div>
      </div>
        </div>
    )
}

export default Hero;