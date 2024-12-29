import React from "react";


const Header = () => {
    return(
        <header className="bg-white fixed h-[70px] top-0 w-full">
            <nav className="flex pt-[20px] items-center">
                <div className="text-black ">
                    <ul className="flex  text-3xl space-x-[240px] justify-between">
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <li><a href="/function">Function</a></li>
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <li><a href="/">Night</a></li>
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <li><a href="/">Home</a></li>
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <li><a href="/about">Day</a></li>
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
};

export default Header;