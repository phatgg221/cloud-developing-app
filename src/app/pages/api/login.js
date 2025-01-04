import { generators } from 'openid-client';

export default function handler(req, res) {
    const state = generators.state();
    const nonce = generators.nonce();

    const authUrl = `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_1v56Lb2gv/oauth2/authorize?response_type=code&client_id=${'2gjpon357ujm2enjd9qcngn5lm'}&redirect_uri=${'https://d84l1y8p4kdic.cloudfront.net'}&scope=email+openid+profile&state=${state}&nonce=${nonce}`;

    // Store state and nonce in a secure cookie for later validation
    res.setHeader('Set-Cookie', [
        `state=${state}; HttpOnly; Path=/; Secure; SameSite=Lax`,
        `nonce=${nonce}; HttpOnly; Path=/; Secure; SameSite=Lax`,
    ]);

    res.redirect(authUrl);
}
