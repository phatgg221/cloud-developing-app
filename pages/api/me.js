export default function handler(req, res) {
    const userInfo = req.cookies.userInfo;

    if (!userInfo) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    res.status(200).json({ userInfo: JSON.parse(userInfo) });
}
