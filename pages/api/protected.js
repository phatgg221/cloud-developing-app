import AWS from "aws-sdk";

export default async function handler(req, res) {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const cognito = new AWS.CognitoIdentityServiceProvider({ region: "us-east-1" });

    try {
        const user = await cognito.getUser({ AccessToken: accessToken }).promise();
        res.status(200).json({ message: "Authorized", user });
    } catch (err) {
        console.error("Authorization error:", err);
        res.status(401).json({ message: "Unauthorized" });
    }
}
