import { serialize } from "cookie";

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    // Clear cookies by setting them with an expired maxAge
    res.setHeader("Set-Cookie", [
        serialize("accessToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0, // Expire immediately
        }),
        serialize("idToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0,
        }),
        serialize("refreshToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0,
        }),
        serialize("userInfo", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0,
        }),
    ]);

    return res.status(200).json({ message: "Logged out successfully" });
}
