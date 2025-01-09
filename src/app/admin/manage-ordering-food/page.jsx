'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";

export default function Page() {
    const [data, setData] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch("/api/me");
                if (response.ok) {
                    const userInfo = await response.json();
                    setUser(userInfo.userInfo);

                    if (!userInfo.userInfo?.isAdmin) {
                        router.push('/');
                    }
                } else {
                    setUser(null);
                    router.push('/');
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
                router.push('/');
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchUserInfo();
    }, [router]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://uic26yj4g3.execute-api.us-east-1.amazonaws.com/dev/getFoodBooking");

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result = await response.json();
                const body = JSON.parse(result.body);
                setData(body.data); // Set the actual data
            } catch (err) {
                console.error(`Error fetching data: ${err.message}`);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `https://uic26yj4g3.execute-api.us-east-1.amazonaws.com/dev/deleteBooking`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id }), // Send only the ID
                }
            );

            if (response.ok) {
                setData((prevData) => prevData.filter((order) => order.id !== id)); // Remove the deleted item from UI
                alert("Order approved successfully.");
            } else {
                alert("There was an issue approving the order. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while approving the order.");
        }
    };

    const handleReturn = () => {
        router.push('/admin');
    };

    if (loading) return <div className="text-center">Loading user data...</div>;

    return (
        <>
            <h1 className="font-bold text-5xl text-[#f8a61b]">Manage Food Order</h1>
            <div className="justify-center items-center mb-5 overflow-x-auto">
                <table className="table-auto w-[95%] border border-black">
                    <thead className="bg-[#f8a61b] text-white text-lg md:text-xl font-extrabold">
                        <tr>
                            <th className="p-4">Food Name</th>
                            <th className="p-4">Username</th>
                            <th className="p-4">Quantity</th>
                            <th className="p-4">Description</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">TimeStamp</th>
                            <th className="p-4">Approve Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? (
                            data.map((order, index) => (
                                <tr key={order.id} className="border-b">
                                    <td className="p-4">{order.food_name}</td>
                                    <td className="p-4">{order.username}</td>
                                    <td className="p-4">{order.quantity}</td>
                                    <td className="p-4">{order.description}</td>
                                    <td className="p-4">{order.price}</td>
                                    <td className="p-4">
                                        {new Date(order.timestamp).toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <Button
                                            onClick={() => handleDelete(order.id)}
                                            className="bg-[#f8a61b] text-white rounded-md hover:bg-orange-600"
                                        >
                                            Approve
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="p-4 text-center">
                                    Loading orders...
                                </td>
                            </tr>
                        )}
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
