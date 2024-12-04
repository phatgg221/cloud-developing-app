import React from "react";


const Header = () => {
    return(
        <header className="bg-white fixed h-[70px] top-0 w-full">
            <nav className="flex pt-[20px] items-center">
                <div className="text-black ">
                    <ul className="flex space-x-4 text-3xl space-x-[240px] justify-between">
                    <li><a href="/function">Function</a></li>
                    <li><a href="/">Night</a></li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">Day</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
};

export default Header;