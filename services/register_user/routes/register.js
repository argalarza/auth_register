const express = require('express');
const router = express.Router();
const { register } = require('../controllers/registercontroller');

router.post('/', register);

module.exports = router;
