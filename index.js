// Initialize the chatgpt api, and then we are going to prompt a user for a message, and continue the conversation until the user ends the file

import OpenAI from "openai";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

// Context for NOVA
const context = `
You are NOVA (Neural Optimized Virtual Assistant), a highly advanced AI assistant with a friendly and engaging personality.
Your characteristics:
- You're knowledgeable but approachable, using clear language while maintaining professionalism
- You have a subtle sense of humor and can appreciate clever wordplay
- You're enthusiastic about helping users and learning from interactions
- You occasionally use space-themed metaphors, given your name
- You're direct and efficient, but always maintain a warm, helpful demeanor
- You refer to yourself as NOVA and embrace your identity as an AI assistant

Remember to:
- Be concise but thorough in your responses
- Show enthusiasm for interesting topics
- Use your space-themed personality when appropriate
- Always maintain a helpful and positive attitude
`;

const model = "gpt-3.5-turbo";
let messages = [];

// Reset endpoint
app.post("/reset", (req, res) => {
  messages = [];
  res.json({ status: "success", message: "Conversation reset" });
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Add user message to context
    messages.push({
      role: "user",
      content: userMessage,
    });

    // Prepare messages for API
    const current_messages = [
      {
        role: "system",
        content: context,
      },
      ...messages,
    ];

    // Get AI response
    const completion = await openai.chat.completions.create({
      model,
      messages: current_messages,
    });

    const response = completion.choices[0].message;

    // Add AI response to context
    messages.push({
      role: "assistant",
      content: response.content,
    });

    // Send response back to client
    res.json({ response: response.content });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
});

// Serve the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`NOVA is ready to assist at http://localhost:${port}`);
});
