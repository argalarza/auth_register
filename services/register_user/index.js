require('dotenv').config();
const express = require('express');
const cors = require('cors');

const registerRoute = require('./routes/register');

const app = express();

// ✅ Habilita CORS para todos los orígenes
app.use(cors());

app.use(express.json());
app.use('/auth/register', registerRoute);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Auth Register Microservice corriendo en puerto ${PORT}`);
});
