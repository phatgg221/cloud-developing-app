import AWS from "aws-sdk";
import crypto from "crypto";
import { serialize } from "cookie"; // Library for handling cookies

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, password } = req.body;
    const clientId = "2gjpon357ujm2enjd9qcngn5lm";
    const clientSecret = "gfh21gs4f62rshdeq2obnlqd0hagou9gapo9527jkfdn8r6fne9";
    const region = "us-east-1";

    // Generate the secret hash
    const secretHash = crypto
        .createHmac("sha256", clientSecret)
        .update(username + clientId)
        .digest("base64");

    const cognito = new AWS.CognitoIdentityServiceProvider({ region });

    const params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: clientId,
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password,
            SECRET_HASH: secretHash,
        },
    };

    try {
        const response = await cognito.initiateAuth(params).promise();

        // Extract tokens
        const { AccessToken, IdToken, RefreshToken } = response.AuthenticationResult;

        // Set cookies (secure and HTTP-only)
        res.setHeader("Set-Cookie", [
            serialize("accessToken", AccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/", // Cookie available on all routes
                maxAge: 60 * 60, // 1 hour
            }),
            serialize("idToken", IdToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60,
            }),
            serialize("refreshToken", RefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 7 days
            }),
        ]);

        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error("Login error:", err);
        res.status(400).json({ error: err.message });
    }
}
