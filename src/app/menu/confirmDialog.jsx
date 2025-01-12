"use client";

import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { v4 as uuidv4 } from "uuid"; // Import UUID
import { Input } from "../../components/input";

const ConfirmDialog = ({ username, foodname, price, apiEndpoint }) => {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    quantity: "",
    description: "",
    username,
    food_name: foodname,
    price,
    timestamp: new Date().toISOString(),
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirm = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const requestBody = {
      httpMethod: "POST",
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch('https://uic26yj4g3.execute-api.us-east-1.amazonaws.com/dev/createNewBooking', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setSuccess("Order created successfully!");
        console.log("Order created:", formData);
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.message || "Failed to create the order.");
      }
    } catch (error) {
      setError("An error occurred while creating the order.");
      console.error("Error creating order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please give us more information</DialogTitle>
          <DialogDescription>Input quantity and description</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleConfirm}>
          <div className="mt-4">
            {/* Quantity Input */}
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                Quantity
              </label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Enter additional notes or preferences"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              ></textarea>
            </div>


            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

      
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600 transition duration-300 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Confirm"}
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                onClick={() => setFormData({ ...formData, quantity: "", description: "" })}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </div>
  );
};

export default ConfirmDialog;
