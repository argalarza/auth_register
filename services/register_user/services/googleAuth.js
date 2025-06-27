const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();
  return {
    name: payload.name,
    email: payload.email,
    birthdate: payload.birthdate || null,
    gender: payload.gender || null
  };
}

module.exports = { verifyGoogleToken };
