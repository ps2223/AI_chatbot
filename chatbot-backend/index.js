import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt: message,
      stream: false
    });

    res.json({ reply: response.data.response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
