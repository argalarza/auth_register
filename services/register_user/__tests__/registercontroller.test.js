const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

// Mocks mínimos
jest.mock('../models/user', () => ({
  findUserByEmail: jest.fn(),
  createUser: jest.fn()
}));
jest.mock('../services/recaptcha', () => ({
  verifyRecaptcha: jest.fn()
}));
jest.mock('bcryptjs', () => ({
  hash: jest.fn()
}));

const { findUserByEmail, createUser } = require('../models/user');
const { verifyRecaptcha } = require('../services/recaptcha');
const bcrypt = require('bcryptjs');
const { register } = require('../controllers/registercontroller');

const app = express();
app.use(bodyParser.json());
app.post('/auth/register', register);

describe('💡 Registro LOCAL', () => {
  test('🟢 Registro exitoso', async () => {
    verifyRecaptcha.mockResolvedValue(true);
    findUserByEmail.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed123');
    createUser.mockResolvedValue(999);

    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Pepe',
        email: 'pepe@mail.com',
        password: '123456',
        birthdate: '1990-01-01',
        gender: 'M',
        recaptchaToken: 'fake'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('userId', 999);
  });

  test('🟥 Falla si ya existe el email', async () => {
    verifyRecaptcha.mockResolvedValue(true);
    findUserByEmail.mockResolvedValue({ email: 'ya@mail.com' });

    const res = await request(app)
      .post('/auth/register')
      .send({
        name: 'Alguien',
        email: 'ya@mail.com',
        password: 'abc',
        birthdate: '1995-01-01',
        gender: 'F',
        recaptchaToken: 'fake'
      });

    expect(res.statusCode).toBe(409);
  });
});
