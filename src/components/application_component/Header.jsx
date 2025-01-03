"use client"
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const Header = () => {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <header className="bg-black fixed h-[70px] top-0 w-full shadow-md z-50">
            <nav className="flex items-center justify-center space-x-20 px-20 py-4">
                <div className="text-white">
                    <ul className="flex space-x-24 text-2xl">
                        <li>
                            <Link
                                href="/"
                                className="transition-all hover:text-[#d4af37] font-medium "
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/menu"
                                className="transition-all hover:text-[#d4af37] font-medium"
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
                                href="/table"
                                className="transition-all hover:text-[#d4af37] font-medium"
                            >
                                Table
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact-us"
                                className="transition-all hover:text-[#d4af37] font-medium"
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-[#d4af37] text-black hover:bg-[#b59e2d] transition-all px-6 py-2 rounded-lg font-medium">
                            Login
                        </Button>
                    </DialogTrigger>

                    {/* Dialog Content */}
                    <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                        <DialogHeader>
                            <DialogTitle>
                                {activeTab === "login" ? "Login" : "Register"}
                            </DialogTitle>
                            <DialogDescription>
                                {activeTab === "login"
                                    ? "Please enter your credentials to login."
                                    : "Create a new account by filling out the details below."}
                            </DialogDescription>
                        </DialogHeader>


                        <div className="flex space-x-4 mb-4">
                            <button
                                className={`px-4 py-2 font-medium transition-all rounded-md ${
                                    activeTab === "login" ? "bg-[#d4af37] text-black" : "bg-gray-200"
                                }`}
                                onClick={() => setActiveTab("login")}
                            >
                                Login
                            </button>
                            <button
                                className={`px-4 py-2 font-medium transition-all rounded-md ${
                                    activeTab === "register" ? "bg-[#d4af37] text-black" : "bg-gray-200"
                                }`}
                                onClick={() => setActiveTab("register")}
                            >
                                Register
                            </button>
                        </div>


                        {activeTab === "login" && (
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block font-medium">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button className="bg-[#d4af37] text-black hover:bg-[#b59e2d] transition-all px-4 py-2 rounded-md">
                                        Login
                                    </Button>
                                </div>
                            </form>
                        )}

                        {activeTab === "register" && (
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block font-medium">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block font-medium">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button className="bg-[#d4af37] text-black hover:bg-[#b59e2d] transition-all px-4 py-2 rounded-md">
                                        Register
                                    </Button>
                                </div>
                            </form>
                        )}
                    </DialogContent>
                </Dialog>
            </nav>
        </header>
    );
};

export default Header;
