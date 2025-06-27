const axios = require('axios');

async function verifyFacebookToken(token) {
  const url = `https://graph.facebook.com/me?fields=id,name,email,birthday,gender&access_token=${token}`;
  const { data } = await axios.get(url);
  return {
    name: data.name,
    email: data.email,
    birthdate: data.birthday ? new Date(data.birthday) : null,
    gender: data.gender || null
  };
}

module.exports = { verifyFacebookToken };
