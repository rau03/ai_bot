# AI Chat Bot

A simple command-line chat bot that uses OpenAI's GPT-3.5 API to engage in conversations with users.

## Features

- Interactive command-line interface
- Uses OpenAI's GPT-3.5 model for responses
- Maintains conversation context
- Simple and easy to use

## Prerequisites

- Node.js installed on your system
- An OpenAI API key

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_SECRET_KEY=your_api_key_here
   ```

## Usage

1. Start the chat bot:
   ```bash
   node index.js
   ```
2. Type your message and press Enter
3. The bot will respond to your message
4. Continue the conversation as long as you'd like
5. To exit the program, press Ctrl+C multiple times or close the terminal

## Dependencies

- openai: For interacting with OpenAI's API
- prompt-sync: For handling command-line input
- dotenv: For loading environment variables

## Project Structure

- `index.js`: Main application file
- `.env`: Environment variables (not tracked in git)
- `package.json`: Project dependencies and scripts

## Note

Make sure to keep your OpenAI API key secure and never commit it to version control.
