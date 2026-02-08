# AI_chatbot
An end-to-end AI-powered chatbot application built using React (Vite) + Tailwind CSS for the frontend and FastAPI / Express + Ollama for the backend. This project enables users to interact with locally hosted LLM models via Ollama, providing fast, private, and offline AI conversations.


How to run :

chatbotbackend:
mkdir chatbot-backend
>> cd chatbot-backend
>> npm init -y
>> npm install express cors axios

then create a index.js 

and run:- node index.js


chatbotfrontend:
npm create vite@latest chatbot-frontend -- --template react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
npm run dev
