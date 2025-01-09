'use client';
import React, { useState } from "react";
import Image from "next/image";

const MainComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateInputs = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true); // Set loading state

    try {
      const requestBody = { body: JSON.stringify(formData) };

      // Make the POST request to the API endpoint
      const response = await fetch("https://umdr1ohpzk.execute-api.us-east-1.amazonaws.com/dev", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form. Please try again.");
      }

      const data = await response.json();
      console.log("API Response:", data);
      alert("Your message has been sent!");

      // Clear form after successful submission
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className="bg-white py-10 px-5 pt-36">
      <div className="flex justify-center items-center">
        <div className="flex max-w-3xl w-full mx-5">
          <div className="flex-1 pr-5">
            <Image
              src="/cafe-hero.jpg"
              width={200}
              height={521}
              alt="hello"
              className="w-full h-[521px] object-cover"
            />
          </div>
          <div className="flex-1 p-5">
            <h1 className="text-xl mb-4">Contact Us</h1>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-lg font-semibold">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md`}
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-semibold">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-semibold">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.message ? "border-red-500" : "border-gray-300"} rounded-md`}
                  placeholder="Enter your message"
                  rows="4"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-[#d4af37] text-white py-2 rounded-md hover:bg-[#c29a2d]"
                  disabled={isSubmitting} // Disable button while submitting
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
