require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const axios = require('axios');

connectDB();

const app = express();
const PORT = process.env.PORT || 5005;
const FLASK_URL = process.env.FLASK_URL || 'http://localhost:5000';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.get('/call-flask', async (req, res) => {
    try {
      const flaskResponse = await axios.get(`${FLASK_URL}/flask-route`);
      res.json(flaskResponse.data);
    } catch (error) {
      console.error('Error calling Flask:', error.message);
      res.status(500).json({ error: 'Error calling Flask API' });
    }
  });

let server;
app.listen(PORT, () => {
    console.log('Server is running on Port:', PORT);
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})

