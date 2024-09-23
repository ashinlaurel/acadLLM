const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai'); // Adjusted import

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all requests
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define a POST route to handle chat completions
app.post('/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });
    res.json(response.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong with OpenAI API');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
