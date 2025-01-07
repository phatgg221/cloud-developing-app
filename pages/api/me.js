import { parse } from "cookie";
import { CloudCog } from "lucide-react";

export default function handler(req, res) {
    const cookies = parse(req.headers.cookie || "");
    const userInfo = cookies.userInfo;
    console.log(userInfo, 'user infor')
    if (!userInfo) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    res.status(200).json({ userInfo: JSON.parse(userInfo) });
}
