const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
// const { default: mongoose } = require('mongoose');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/uploads', express.static('uploads'));

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(console.log("Acad LLM DB CONNECTED"))
  .catch((err) => {
    console.log(err);
  });

app.get("/api/test", (req, res) => {
  res.status(200).send("Successfull! Backend Routes Working");
});



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use((req, res, next) => {
  req.openai = openai;
  next();
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

// Import routes
const lectureRoutes = require('./routes/lectureRoutes');
const courseRoutes = require('./routes/courseRoutes')

// const { default: mongoose } = require('mongoose');

// Use the lecture routes
app.use('/api/courses', courseRoutes);
app.use('/api/lectures', lectureRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
