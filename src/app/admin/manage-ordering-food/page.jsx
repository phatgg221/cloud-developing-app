'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const handleReturn = () => {
        router.push('/admin');
    };

    // Sample data for the table
    const orders = [
        {
            foodName: "Margherita Pizza",
            username: "john_doe",
            quantity: 2,
            description: "Classic cheese pizza with tomato sauce",
            price: "$15.99",
            timestamp: "2025-01-08 14:32"
        },
        {
            foodName: "Cheeseburger",
            username: "jane_smith",
            quantity: 1,
            description: "Beef patty with cheddar cheese, lettuce, and tomato",
            price: "$9.99",
            timestamp: "2025-01-08 15:00"
        },
        {
            foodName: "Caesar Salad",
            username: "alice_brown",
            quantity: 3,
            description: "Fresh romaine lettuce with Caesar dressing and croutons",
            price: "$7.50",
            timestamp: "2025-01-08 15:30"
        },
        {
            foodName: "Spaghetti Carbonara",
            username: "bob_jones",
            quantity: 2,
            description: "Pasta with creamy egg-based sauce, pancetta, and parmesan",
            price: "$12.99",
            timestamp: "2025-01-08 16:10"
        }
    ];

    return (
        <>
        
            <h1 className="font-bold text-5xl text-[#f8a61b]">Manage Food Order</h1>
            <div className=' justify-center items-center mb-5 overflow-x-auto'>
                <table className='table-auto w-[95%] border border-black'>
                    <thead className='bg-[#f8a61b] text-white text-lg md:text-xl font-extrabold'>
                        <tr>
                            <th className='p-4'>Food name</th>
                            <th className='p-4'>Username</th>
                            <th className='p-4'>Quantity</th>
                            <th className='p-4'>Description</th>
                            <th className='p-4'>Price</th>
                            <th className='p-4'>TimeStamp</th>
                            <th className='p-4'>Approve Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="border-b">
                                <td className='p-4'>{order.foodName}</td>
                                <td className='p-4'>{order.username}</td>
                                <td className='p-4'>{order.quantity}</td>
                                <td className='p-4'>{order.description}</td>
                                <td className='p-4'>{order.price}</td>
                                <td className='p-4'>{order.timestamp}</td>
                                <td className='p-4'>
                                    <Button>Approve</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-center items-center mt-5 mb-5 gap-5">
                    <button
                        className="px-6 py-3 bg-[#f8a61b] text-white rounded-md hover:bg-orange-600 transition-colors duration-150"
                        onClick={handleReturn}
                    >
                        Return
                    </button>
                </div>
            </div>
        </>
    );
}
