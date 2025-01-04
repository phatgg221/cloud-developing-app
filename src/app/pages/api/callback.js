import { Issuer } from 'openid-client';

export default async function handler(req, res) {
    const { code, state } = req.query;

    // Validate state from cookies
    const storedState = req.cookies.state;
    if (state !== storedState) {
        return res.status(400).json({ error: 'Invalid state parameter' });
    }

    const issuer = await Issuer.discover('https://cognito-idp.us-east-1.amazonaws.com/us-east-1_1v56Lb2gv/');
    const client = new issuer.Client({
        client_id: '2gjpon357ujm2enjd9qcngn5lm',
        client_secret: 'gfh21gs4f62rshdeq2obnlqd0hagou9gapo9527jkfdn8r6fne9',
        redirect_uris: ['https://d84l1y8p4kdic.cloudfront.net'],
        response_types: ['code'],
    });

    try {
        const tokenSet = await client.callback('https://d84l1y8p4kdic.cloudfront.net', { code }, { state });
        const userInfo = await client.userinfo(tokenSet.access_token);

        // Store user session
        res.setHeader('Set-Cookie', [
            `token=${tokenSet.access_token}; HttpOnly; Path=/; Secure; SameSite=Lax`,
            `userInfo=${JSON.stringify(userInfo)}; Path=/; Secure; SameSite=Lax`,
        ]);

        res.redirect('/');
    } catch (error) {
        console.error('Error during token exchange:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
}
