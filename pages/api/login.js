import { v4 as uuidv4 } from 'uuid';

export default function handler(req, res) {
    const state = uuidv4(); // Generate a random UUID for state
    const nonce = uuidv4(); // Generate a random UUID for nonce

    const redirectUri = encodeURIComponent('http://localhost:3000/api/callback'); // Local or production

    const authUrl = `https://us-east-11v56lb2gv.auth.us-east-1.amazoncognito.com/login?client_id=2gjpon357ujm2enjd9qcngn5lm&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fd84l1y8p4kdic.cloudfront.net;`;

    res.setHeader('Set-Cookie', [
        `state=${state}; HttpOnly; Path=/; Secure; SameSite=Lax`,
        `nonce=${nonce}; HttpOnly; Path=/; Secure; SameSite=Lax`,
    ]);

    console.log('Auth URL:', authUrl); // Debugging
    console.log('State:', state); // Debugging

    res.redirect(authUrl);
}
