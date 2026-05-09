const express = require('express');
const cors = require('cors');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes.js');

app.use(cors());
app.use(express.json());

app.use('/',schoolRoutes);

module.exports =app;