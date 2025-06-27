const axios = require('axios');
require('dotenv').config();

async function verifyRecaptcha(token) {
  const url = `https://www.google.com/recaptcha/api/siteverify`;
  const { data } = await axios.post(url, null, {
    params: {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token
    }
  });
  return data.success;
}

module.exports = { verifyRecaptcha };
