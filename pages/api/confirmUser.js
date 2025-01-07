import { CognitoIdentityServiceProvider } from "aws-sdk";
import crypto from "crypto";

const region = "us-east-1"; // Replace with your AWS region
const clientId = "2gjpon357ujm2enjd9qcngn5lm"; // Replace with your Client ID
const clientSecret = "gfh21gs4f62rshdeq2obnlqd0hagou9gapo9527jkfdn8r6fne9"; // Replace with your Client Secret

// Generate the Secret Hash
const generateSecretHash = (username, clientId, clientSecret) => {
  return crypto
    .createHmac("sha256", clientSecret)
    .update(username + clientId)
    .digest("base64");
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, verificationCode } = req.body;

  if (!username || !verificationCode) {
    return res.status(400).json({ message: "Missing username or verification code" });
  }

  const cognito = new CognitoIdentityServiceProvider({ region });

  const params = {
    ClientId: clientId,
    SecretHash: generateSecretHash(username, clientId, clientSecret),
    ConfirmationCode: verificationCode,
    Username: username,
  };

  try {
    const result = await cognito.confirmSignUp(params).promise();
    return res.status(200).json({ message: "User confirmed successfully", result });
  } catch (error) {
    console.error("Error confirming user:", error);
    return res.status(400).json({ message: error.message });
  }
}
