"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Assuming you have user information passed via props or fetched from an API
const UserProfile = ({ apiBaseUrl, userId, userInfo }) => {
    const [userData, setUserData] = useState(userInfo || null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); // Loading state
    const router = useRouter();
    
    // If no userData is available, redirect to the home page
    useEffect(() => {
        if (!userData && !loading) {
            // Only redirect after the data has finished loading
            router.push('/');
        }
    }, [userData, router, loading]);


    useEffect(() => {
        if (!userInfo) {
            
            fetch(`/api/me`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch user data");
                    }
                    return response.json();
                })
                .then((data) => {
                    setUserData(data.userInfo);
                    setLoading(false); 
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false); 
                });
        } else {
            setLoading(false); 
        }
    }, [apiBaseUrl, userId, userInfo]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <h2>User Profile</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ marginBottom: "10px" }}>
                <label>Username:</label>
                <input
                    type="text"
                    value={userData.username || ''}
                    disabled
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <label>Name:</label>
                <input
                    type="text"
                    value={userData.name || ''}
                    disabled
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <label>Email:</label>
                <input
                    type="email"
                    value={userData.email}
                    disabled
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                />
            </div>
        </div>
    );
};

export default UserProfile;
