import React, { useState } from 'react';
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid"; // Import UUID
import { Input } from '@/components/ui/input';

export default function ConfirmDialog({ username, foodname, price, apiEndpoint }) {
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const handleConfirm = async () => {
        const orderData = {
            id: uuidv4(),
            quantity: parseInt(quantity, 10),
            description,
            username,
            foodname,
            price,
            timestamp: new Date().toISOString(),
        };

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                alert('Order created successfully!');
                console.log('Order created:', orderData);
            } else {
                const errorResponse = await response.json();
                alert(errorResponse.message || 'Failed to create the order.');
            }
        } catch (error) {
            alert('An error occurred while creating the order.');
            console.error('Error creating order:', error);
        }
    };

    return (
        <div>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Please give us more information</DialogTitle>
                    <DialogDescription>Input quantity and description</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    {/* Quantity Input */}
                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                            Quantity
                        </label>
                        <Input
                            id="quantity"
                            type="number"
                            placeholder="Enter quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Description Input */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            placeholder="Enter additional notes or preferences"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        ></textarea>
                    </div>

                    {/* Confirm and Cancel Buttons */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleConfirm}
                            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 transition duration-300"
                        >
                            Confirm
                        </button>
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </DialogContent>
        </div>
    );
}
