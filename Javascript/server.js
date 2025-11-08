// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const API_KEY = 'PmN44Y6zjAfPItBhEHw7bNAOzB0cAfgRvBOB5RCT';
const BASE_URL = 'https://api.sportradar.com/soccer/trial/v4';

app.get('/player/:id', async (req, res) => {
  try {
    const playerId = req.params.id;
    const response = await axios.get(`${BASE_URL}/players/${playerId}/profile.json?api_key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching player data');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
