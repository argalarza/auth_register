const bcrypt = require('bcryptjs');
const { verifyRecaptcha } = require('../services/recaptcha');
const { verifyGoogleToken } = require('../services/googleAuth');
const { verifyFacebookToken } = require('../services/facebookAuth');
const { findUserByEmail, createUser } = require('../models/user');

async function register(req, res) {
  const {
    name, email, password, birthdate, gender,
    recaptchaToken, provider, oauthToken, role
  } = req.body;

  try {
    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'El email ya está registrado' });

    const allowedRoles = ['admin', 'seller', 'client'];
    const userRole = allowedRoles.includes(role) ? role : 'client';

    let userData = {
      name, email, birthdate, gender,
      provider: provider || 'local',
      role: userRole,
      password_hash: null
    };
if (provider === 'google') {
  if (!oauthToken) return res.status(400).json({ error: 'Token de Google faltante' });
  const data = await verifyGoogleToken(oauthToken);
  userData = { ...userData, ...data, provider: 'google' };

} else if (provider === 'facebook') {
  if (!oauthToken) return res.status(400).json({ error: 'Token de Facebook faltante' });
  const data = await verifyFacebookToken(oauthToken);
  userData = { ...userData, ...data, provider: 'facebook' };
}

    if (provider === 'google') {
      const data = await verifyGoogleToken(oauthToken);
      userData = { ...userData, ...data, provider: 'google' };
    } else if (provider === 'facebook') {
      const data = await verifyFacebookToken(oauthToken);
      userData = { ...userData, ...data, provider: 'facebook' };
    } else {
      if (!password) return res.status(400).json({ error: 'Contraseña requerida' });
      userData.password_hash = await bcrypt.hash(password, 12);
    }

    const newUserId = await createUser(userData);
    res.status(201).json({ message: 'Registro exitoso', userId: newUserId, role: userRole });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}

module.exports = { register };
