export default function handler(req, res) {
    res.setHeader('Set-Cookie', [
        `token=; HttpOnly; Path=/; Max-Age=0;`,
        `userInfo=; Path=/; Max-Age=0;`,
    ]);
    const logout_url= 'http://localhost:3000';
    const logoutUrl = `https://us-east-11v56lb2gv.auth.us-east-1.amazoncognito.com/logout?client_id=2gjpon357ujm2enjd9qcngn5lm&logout_uri=${logout_url}`;
    res.redirect(logoutUrl);
}
