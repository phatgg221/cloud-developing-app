import React from "react";

const Header = () => {
    return (
        <header className="bg-white fixed h-[70px] top-0 w-full shadow-md z-50">
            <nav className="flex items-center justify-center px-20 py-4">
                <div className="text-black">
                    <ul className="flex space-x-24 text-2xl">
                        <li>
                            <a
                                href="/"
                                className="transition-all hover:text-blue-500 font-medium hover:underline"
                            >
                                Night
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                className="transition-all hover:text-blue-500 font-medium hover:underline"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/about"
                                className="transition-all hover:text-blue-500 font-medium hover:underline"
                            >
                                Day
                            </a>
                        </li>
                        <li>
                            <a
                                href="/contact"
                                className="transition-all hover:text-blue-500 font-medium hover:underline"
                            >
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;