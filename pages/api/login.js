import AWS from "aws-sdk";
import crypto from "crypto";
import { serialize } from "cookie";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, password } = req.body;

    const clientId = process.env.COGNITO_CLIENT_ID || '2gjpon357ujm2enjd9qcngn5lm';
    const clientSecret = process.env.COGNITO_CLIENT_SECRET || 'gfh21gs4f62rshdeq2obnlqd0hagou9gapo9527jkfdn8r6fne9';
    const region = process.env.AWS_REGION || "us-east-1";

    if (!clientId || !clientSecret) {
        return res.status(500).json({ error: "Server misconfiguration" });
    }

    // Generate the secret hash
    const secretHash = crypto
        .createHmac("sha256", clientSecret)
        .update(username + clientId)
        .digest("base64");

    const cognito = new AWS.CognitoIdentityServiceProvider({
        region,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

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
        // Step 1: Authenticate the user
        const response = await cognito.initiateAuth(params).promise();
        const { AccessToken, IdToken, RefreshToken } = response.AuthenticationResult;

        // Step 2: Decode the IdToken
        const decodedToken = JSON.parse(atob(IdToken.split(".")[1]));

        // Debug: Log the decoded token to check the value of "cognito:groups"
        // console.log("Decoded Token:", decodedToken);

        // Step 3: Safely handle the "cognito:groups" claim
        let userGroups = [];
        if (decodedToken["cognito:groups"]) {
            // If "cognito:groups" is a string, split it
            if (typeof decodedToken["cognito:groups"] === "string") {
                userGroups = decodedToken["cognito:groups"].split(",");
            }
            // If "cognito:groups" is already an array, use it directly
            else if (Array.isArray(decodedToken["cognito:groups"])) {
                userGroups = decodedToken["cognito:groups"];
            }
        }

        const isAdmin = userGroups.includes("admin");

        const userInfo = {
            username: decodedToken["cognito:username"],
            email: decodedToken.email || "Unknown",
            name: decodedToken.name || "Unknown",
            isAdmin: isAdmin|| false,
        };

        // Step 4: Set secure cookies
        res.setHeader("Set-Cookie", [
            // serialize("accessToken", AccessToken, {
            //     httpOnly: true,
            //     secure: "production" === "production",
            //     sameSite: "strict",
            //     path: "/",
            //     maxAge: 60 * 60, // 1 hour
            // }),
            // serialize("idToken", IdToken, {
            //     httpOnly: true,
            //     secure: "production" === "production",
            //     sameSite: "strict",
            //     path: "/",
            //     maxAge: 60 * 60,
            // }),
            // serialize("refreshToken", RefreshToken, {
            //     httpOnly: true,
            //     secure: "production" === "production",
            //     sameSite: "strict",
            //     path: "/",
            //     maxAge: 60 * 60 * 24 * 7, // 7 days
            // }),
            serialize("userInfo", JSON.stringify(userInfo), {
                sameSite: "none",
                path: "/",
                maxAge: 60 * 60 * 24, // 1 day
            }),
        ]);

        // Step 5: Respond with success and role
        res.status(200).json({ message: "Login successful", isAdmin });
    } catch (err) {
        console.error("Login error:", err);
        res.status(400).json({ error: err.message });
    }
}
