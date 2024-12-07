import React from "react";
import Image from "next/image";
import StarterSection from "./mainComponent";
import { nightSection } from "@/constant/data";

const NightServe = () => {
    return (
        <div>
            <div className="pt-[100px] text-center pb-[50px]">
                <Image
                    src={"/menulabel.png"}
                    alt="label"
                    width={162}
                    height={22}
                    className="mx-auto"
                />
                <p className="text-4xl pt-[30px] font-bold">
                    Why not have a drink with us?
                </p>
                <p className="mx-auto max-w-lg pt-[20px]">
                    Here is our dedication to serve you the best drinks in town.
                </p>
            </div>
            {nightSection.map((item) => (
                <StarterSection key={item.id} title={item.title} dishes={item.dishes} />
            ))}
        </div>
    );
}

export default NightServe;