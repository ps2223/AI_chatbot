import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");

    const res = await axios.post("http://localhost:5000/chat", {
      message: input,
    });

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: res.data.reply },
    ]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[90vh] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col">

        {/* Header */}
        <div className="py-4 text-center text-xl font-semibold text-white border-b border-white/10">
          🤖 Ollama AI Chatbot
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed transition-all ${
                msg.role === "user"
                  ? "ml-auto bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "mr-auto bg-slate-800 text-slate-200"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 flex gap-3 bg-black/30">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Ask me anything..."
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold hover:scale-105 transition-transform shadow-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
