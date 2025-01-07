'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  // Retrieve the username from localStorage
  const username = localStorage.getItem("username");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username) {
      setErrorMessage("Username is missing. Please try again.");
      return;
    }

    try {
      const response = await fetch("/api/confirmUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, verificationCode }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to verify email.");
      }

      const result = await response.json();
      setSuccessMessage("Email verification successful! You can now login.");
      setErrorMessage("");

      // Remove the username from localStorage after successful verification
      localStorage.removeItem("username");

      // Redirect to login page after success
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      setErrorMessage(err.message || "An error occurred while confirming registration.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Verify your email</h1>
        <p className="text-gray-500 dark:text-gray-400">
          We've sent a verification code to your email address. Enter the code below to confirm your identity.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="verification-code">Verification Code</label>
          <Input
            onChange={(e) => setVerificationCode(e.target.value)}
            id="verification-code"
            type="text"
            placeholder="Enter 6-digit code"
            maxLength={6}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Verify Email
        </Button>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
      </form>
    </div>
  );
}
