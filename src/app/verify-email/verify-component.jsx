'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "@/components/application_component/UserPool";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import crypto from 'crypto';  // Importing the crypto module

// Function to generate SECRET_HASH
const generateSecretHash = (username, clientId, clientSecret) => {
  const hmac = crypto.createHmac('sha256', clientSecret)
                    .update(username + clientId)
                    .digest('base64');
  return hmac;
};

export default function VerifyEmail() {
    const [verificationCode, setVerificationCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    // Retrieve the username from localStorage
    const username = localStorage.getItem('username');

    // Replace with your Cognito app client ID and client secret
    const clientId = "2gjpon357ujm2enjd9qcngn5lm";  // Your client ID
    const clientSecret = "gfh21gs4f62rshdeq2obnlqd0hagou9gapo9527jkfdn8r6fne9";  // Your client secret

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username) {
            setErrorMessage("Username is missing. Please try again.");
            return;
        }

        // Generate the SECRET_HASH
        const secretHash = generateSecretHash(username, clientId, clientSecret);

        const user = new CognitoUser({
            Username: username,
            Pool: UserPool,
        });

        // Try to confirm the registration with the SECRET_HASH
        user.confirmRegistration(verificationCode, true, secretHash, (err, result) => {
            if (err) {
                console.error('Error confirming registration:', err);
                setErrorMessage(err.message || 'An error occurred while confirming registration.');
                setSuccessMessage('');
            } else {
                console.log('Confirmation successful:', result);
                setSuccessMessage('Email verification successful! You can now login.');
                setErrorMessage('');
                
                // Remove the username from localStorage after successful verification
                localStorage.removeItem('username');

                // Redirect to login page after success
                setTimeout(() => {
                    router.push('/login'); // Navigate to login page
                }, 2000);
            }
        });
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
