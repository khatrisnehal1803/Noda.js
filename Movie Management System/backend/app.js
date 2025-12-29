const express = require('express');
const cors = require('cors');
const path = require('path');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/movies', movieRoutes);

module.exports = app;
