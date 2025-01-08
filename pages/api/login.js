import AWS from "aws-sdk";
import crypto from "crypto";
import { serialize } from "cookie";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, password } = req.body;

    const clientId = process.env.COGNITO_CLIENT_ID; 
    const clientSecret = process.env.COGNITO_CLIENT_SECRET;
    const userPoolId = process.env.COGNITO_USER_POOL_ID; 
    const region = process.env.AWS_REGION || "us-east-1";

    if (!clientId || !clientSecret || !userPoolId) {
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

        // Step 2: Fetch user information
        const user = await cognito.getUser({ AccessToken }).promise();
        const userInfo = {
            username: user.Username,
            email: user.UserAttributes.find(attr => attr.Name === "email")?.Value || "Unknown",
            name: user.UserAttributes.find(attr => attr.Name === "name")?.Value || "Unknown",
        };

        // Step 3: Check user groups
        let isAdmin = false;
        try {
            const groupResponse = await cognito.adminListGroupsForUser({
                UserPoolId: userPoolId,
                Username: username,
            }).promise();

            const userGroups = groupResponse.Groups.map(group => group.GroupName);
            isAdmin = userGroups.includes("admin");
        } catch (groupError) {
            console.warn("Group check failed or user is not in any groups:", groupError.message);
        }

        // Step 4: Set secure cookies
        res.setHeader("Set-Cookie", [
            serialize("accessToken", AccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
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
            serialize("userInfo", JSON.stringify(userInfo), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
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
