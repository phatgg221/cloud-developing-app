"use client";

import React, { useState, useEffect } from "react";

const apiBaseUrl = "http://localhost:3000";


const UserProfile = ({ apiBaseUrl, userId }) => {
    const [userData, setUserData] = useState({ name: "", email: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        // Fetch user data from API
        fetch(`${apiBaseUrl}/users/${userId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                return response.json();
            })
            .then((data) => setUserData(data))
            .catch((err) => setError(err.message));
    }, [apiBaseUrl, userId]);

    const handleSave = async () => {
        setError(""); // Clear any previous error
        setSuccess(""); // Clear previous success message

        // Validate new password and confirm password
        if (newPassword && newPassword !== confirmPassword) {
            setError("New password and confirm password do not match");
            return;
        }

        // Prepare request body
        const body = {
            name: userData.name,
            email: userData.email,
        };

        if (newPassword) {
            body.password = newPassword;
            body.oldPassword = oldPassword;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                setError(errorResponse.message || "Failed to update user profile");
                return;
            }

            setSuccess("Profile updated successfully");
            setIsEditing(false);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError("An error occurred while saving the changes");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <h2>User Profile</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <div style={{ marginBottom: "10px" }}>
                <label>Name:</label>
                <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    disabled={!isEditing}
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                />
            </div>
            <div style={{ marginBottom: "10px" }}>
                <label>Email:</label>
                <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    disabled={!isEditing}
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                />
            </div>
            {isEditing && (
                <>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Old Password:</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Confirm New Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        />
                    </div>
                </>
            )}
            <button
                onClick={() => setIsEditing(!isEditing)}
                style={{
                    padding: "10px 20px",
                    marginRight: "10px",
                    backgroundColor: isEditing ? "#ff4d4d" : "#007bff",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
                <button
                    onClick={handleSave}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Save
                </button>
            )}
        </div>
    );
};

export default UserProfile;
