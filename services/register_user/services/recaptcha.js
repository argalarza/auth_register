// services/recaptcha.js
const axios = require('axios');

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret,
          response: token,
        },
      }
    );

    console.log('Respuesta reCAPTCHA:', response.data); 
    return response.data.success;
  } catch (error) {
    console.error('Error al verificar reCAPTCHA:', error);
    return false;
  }
}

module.exports = { verifyRecaptcha };
