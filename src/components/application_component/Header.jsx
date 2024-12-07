import React from "react";
import { Button } from "../ui/button";
import { IoHomeOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
    return (
        <header className="bg-black fixed h-[70px] top-0 w-full shadow-md z-50">
            <nav className="flex items-center justify-center space-x-20 px-20 py-4">
                <div className="text-white">
                    <ul className="flex space-x-24 text-2xl">
                        <li>
                            <Link
                                href="/"
                                className="transition-all hover:text-[#d4af37] font-medium hover:underline"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/menu"
                                className="transition-all hover:text-[#d4af37] font-medium hover:underline"
                            >
                                Menu
                            </Link>
                        </li>
                        <li>
                                 <Link href="/" className="flex items-center">
                                         <Image src="/logo.jpeg" alt="Phoever Logo" width={50} height={50} />
                                 </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="transition-all hover:text-[#d4af37] font-medium hover:underline"
                            >
                                Day
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact-us"
                                className="transition-all hover:text-[#d4af37] font-medium hover:underline"
                            >
                                Contact Us
                            </Link>
                        </li>
                      
                    </ul>
                </div>
               <div className>
               <Button className='bg-[#d4af37] text-black hover:bg-[#b59e2d] transition-all px-4 py-2 rounded-lg font-medium shadow-md' href="/login">
                <Link href="/login">Login</Link>
                </Button>
               </div>
            </nav>
        </header>
    );
};

export default Header;
