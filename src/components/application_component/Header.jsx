'use client'
import React, { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import AWS from "aws-sdk";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
// import { CognitoUserAttribute } from "amazon-cognito-identity-js";
// import UserPool from './UserPool';  // Make sure this is correctly configured
import crypto from 'crypto';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { useRouter } from "next/navigation";
// Function to generate the SECRET_HASH
function generateSecretHash(username, clientId, clientSecret) {
  const hmac = crypto.createHmac('sha256', clientSecret)
                    .update(username + clientId)
                    .digest('base64');
  return hmac;
}

const handleLogin = () => {
    window.location.href = '/api/login'; 
};
const Header = () => {
    const router= useRouter();
    const [activeTab, setActiveTab] = useState("login");
    const [username, setUsername] = useState(''); // Updated state for username
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');  // Email state

    function generateSecretHash(username, clientId, clientSecret) {
        return crypto
            .createHmac("sha256", clientSecret)
            .update(username + clientId)
            .digest("base64");
    }
    
    const onSubmit = async (event) => {
        event.preventDefault();
      
        const clientId = "2gjpon357ujm2enjd9qcngn5lm"; // Replace with your App Client ID
        const clientSecret = "gfh21gs4f62rshdeq2obnlqd0hagou9gapo9527jkfdn8r6fne9"; // Replace with your App Client Secret
        const region = "us-east-1"; // Replace with your Cognito region
      
        // Generate the SECRET_HASH
        const secretHash = generateSecretHash(username, clientId, clientSecret);
      
        const cognito = new AWS.CognitoIdentityServiceProvider({ region });
      
        const params = {
            ClientId: clientId,
            SecretHash: secretHash,
            Username: username,
            Password: password,
            UserAttributes: [
                {
                    Name: "email",
                    Value: email,
                },
                {
                    Name: "name",
                    Value: name,
                },
            ],
        };
      
        try {
            const data = await cognito.signUp(params).promise();
            console.log("Sign-up successful:", data);
            alert("User registered successfully!");
            
            // Save the username to localStorage
            localStorage.setItem('username', username);
    
            router.push('/verify-email');
        } catch (err) {
            console.error("Error during sign-up:", err);
            alert(err.message || "Error during sign-up");
        }
    };
    
    

    return (
        <header className="bg-black fixed h-[70px] top-0 w-full shadow-md z-50">
            <nav className="flex items-center justify-center space-x-20 px-20 py-4">
                <div className="text-white">
                    <ul className="flex space-x-24 text-2xl">
                        <li>
                            <Button onClick={handleLogin}>Login test </Button>
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
                                    <label htmlFor="username" className="block font-medium">
                                        Username
                                    </label>
                                    <input
                                        type="text" 
                                        id="username" 
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Enter your username"
                                        onChange={(event) => setUsername(event.target.value)} 
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
                            <form className="space-y-4" onSubmit={onSubmit}>
                                <div>
                                    <label htmlFor="name" className="block font-medium">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Enter your name"
                                        onChange={(event) => setName(event.target.value)}
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
                                        onChange={(event) => setEmail(event.target.value)} 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="username" className="block font-medium">
                                        Username
                                    </label>
                                    <input
                                        type="text" 
                                        id="username" 
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Enter your username"
                                        onChange={(event) => setUsername(event.target.value)} 
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
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        className="bg-[#d4af37] text-black hover:bg-[#b59e2d] transition-all px-4 py-2 rounded-md"
                                    >
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
