import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config(); // Load environment variables from .env file

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

// Route to handle chatbot messages
app.post("/api/message", async (req, res) => {
  const userMessage = req.body.message;

  try {
    console.log("attempting to connect to openAI....")
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
      max_tokens: 150,
    });
    const botMessage = response.choices[0].message.content.trim();
    console.log(`bot message: ${botMessage}`)
    res.json({ message: botMessage });
  } catch (error) {
     console.error("Error from OpenAI API:", error);
    res.status(500).json({ message: "Error communicating with the AI model" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
