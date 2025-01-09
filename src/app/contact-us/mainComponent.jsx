'use client';
import React, { useState } from "react";
import Image from "next/image";

const MainComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }
  
    setIsSubmitting(true); // Set loading state
  
    try {
      // Log the form data before sending
      // console.log("Form data to be sent:", formData);

      const requestBody= {body:JSON.stringify(formData)};
  
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
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-semibold">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-semibold">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your message"
                  rows="4"
                />
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
