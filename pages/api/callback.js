import { Issuer } from 'openid-client';
import cookie from 'cookie';

export default async function handler(req, res) {
    const { code, state } = req.query;

    const storedState = cookie.parse(req.headers.cookie || '').state;

    if (!storedState || state !== storedState) {
        console.error('Invalid state:', { state, storedState });
        return res.status(400).json({ error: 'Invalid state parameter' });
    }

    const issuer = await Issuer.discover('https://cognito-idp.us-east-1.amazonaws.com/us-east-1_1v56Lb2gv');

    const client = new issuer.Client({
        client_id: '2gjpon357ujm2enjd9qcngn5lm',
        client_secret: 'gfh21gs4f62rshdeq2obnlqd0hagou9gapo9527jkfdn8r6fne9',
        redirect_uris: ['http://localhost:3000/api/callback'], 
        response_types: ['code'],
    });

    try {
        const tokenSet = await client.callback('http://localhost:3000/api/callback', { code }, { state });

        const userInfo = await client.userinfo(tokenSet.access_token);

        res.setHeader('Set-Cookie', [
            cookie.serialize('token', tokenSet.access_token, {
                httpOnly: true,
                secure: false, // For localhost, set to true for production
                path: '/',
                sameSite: 'lax',
            }),
            cookie.serialize('userInfo', JSON.stringify(userInfo), {
                path: '/',
                sameSite: 'lax',
            }),
        ]);

        console.log('User Info:', userInfo); // Debugging
        res.redirect('/');
    } catch (error) {
        console.error('Error during token exchange:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
}
