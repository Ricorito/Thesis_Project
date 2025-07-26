import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import Chatbotlogo from "/assets/Chatbot.jpg";
import prompts from "../../json/chatbotPredefinedPrompts.json";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      message:
        "Hi! 😊 I'm Henia, your virtual assistant. How can I support you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const predefinedPromptsSELECT = prompts.map((prompt) => {
  if (typeof prompt.response === "string" && prompt.response.startsWith("linktext:")) {
    const [path, text] = prompt.response
      .replace("linktext:", "")
      .split("::");
    return {
      ...prompt,
      response: (
        <Link to={path.trim()} className="text-blue-500 underline">
          {text.trim()}
        </Link>
      ),
    };
  } else if (prompt.response.startsWith("link:")) {
    const path = prompt.response.replace("link:", "");
    return {
      ...prompt,
      response: (
        <Link to={path} className="text-blue-500 underline">
          {prompt.text}
        </Link>
      ),
    };
  }
  return prompt;
});

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;
    setIsLoading(true);

    const matchingPrompt = predefinedPromptsSELECT.find((prompt) =>
      prompt.text.toLowerCase().includes(userInput.toLowerCase())
    );

    if (matchingPrompt) {
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: userInput },
        { type: "bot", message: matchingPrompt.response },
      ]);
      setUserInput("");
      setIsLoading(false);
      return;
    }

    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      setChatHistory((prev) => [
        ...prev,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([
      {
        type: "bot",
        message: "You cleared the chat history. How else can I help you? 😊",
      },
    ]);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handlePredefinedPromptClick = (prompt) => {
    setChatHistory((prev) => [
      ...prev,
      { type: "user", message: prompt.text },
      { type: "bot", message: prompt.response },
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-jakarta">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="relative group p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl"
        >
          <span className="absolute inset-0 flex items-center justify-center z-0 ">
            <span className="absolute bg-blue-600 h-16 w-16 rounded-full opacity-75 animate-[ping_3s_ease-out_3] pointer-events-none" />
          </span>
          <img
            src={Chatbotlogo}
            alt="Chatbot"
            className="relative z-10 w-12 h-12 object-cover rounded-full border border-columbia transition duration-300 group-hover:brightness-110 group-hover:saturate-150"
          />
        </button>
      )}

      {isOpen && (
        <div className="w-80 h-[500px] bg-white/70 backdrop-blur-sm shadow-2xl rounded-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-teal-200 to-green-100 text-gray-800 font-semibold rounded-t-2xl">
            <h2 className="text-md">Henia 🌿</h2>
            <button
              onClick={toggleChat}
              className="text-lg hover:text-gray-600 transition"
            >
              ✖
            </button>
          </div>

          <div className="flex-grow overflow-y-auto px-3 py-2 space-y-1 text-sm text-gray-800">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`max-w-[75%] px-3 py-2 rounded-xl ${
                  message.type === "user"
                    ? "ml-auto bg-teal-100 text-gray-700 shadow-sm"
                    : "mr-auto bg-white/60 text-gray-800 shadow-sm"
                }`}
              >
                {typeof message.message === "string" ? (
                  <ReactMarkdown>{message.message}</ReactMarkdown>
                ) : (
                  message.message
                )}
              </div>
            ))}
            {isLoading && <div className="text-gray-500 italic">Thinking…</div>}
            {chatHistory.length > 0 && !isLoading && (
              <div className="w-full max-w-[95%] flex flex-wrap gap-2 mt-4 justify-center mx-auto">
                {predefinedPromptsSELECT.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePredefinedPromptClick(prompt)}
                    className="px-3 py-1 bg-teal-100 text-black text-xs rounded-full hover:bg-green-200 transition whitespace-normal break-words"
                  >
                    {prompt.text}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 bg-white/80 border-t border-white/50">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userInput}
                onChange={handleUserInput}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-grow text-sm px-4 py-2 rounded-full border border-gray-300 bg-white/90 focus:ring-2 focus:ring-carolina outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || userInput.trim() === ""}
                className="text-white bg-darkblue px-4 py-2 rounded-full text-sm hover:bg-teal-700 transition disabled:bg-gray-300"
              >
                Send
              </button>
            </div>
            <button
              onClick={clearChat}
              className="mt-2 text-xs text-gray-500 hover:text-red-500"
            >
              Clear chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
