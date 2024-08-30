"use client";

import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Image from "next/image";

// Example avatars for users
const avatars = {
  Ravish: "/ravish.png",
  Dipu: "/dipu.png",
  // Add more avatars as needed
};

let socket;

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const inputRef = useRef(null); // Initialize useRef

  useEffect(() => {
    // Initialize Socket.IO client
    socket = io();

    // Listen for incoming messages
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setLoggedIn(true);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const chatMessage = {
        username,
        message,
      };
      socket.emit("chat message", chatMessage);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.style.height = "auto"; // Reset to auto to shrink back
        inputRef.current.focus(); // Keep the input focused
      }
    }
  };

  // Handle input height adjustment
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    // Auto-resize the textarea
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    const chatEndRef = document.getElementById("chat-end");
    if (chatEndRef) {
      chatEndRef.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200 p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-gray-800 rounded-lg shadow-lg p-4"
        >
          <h1 className="text-xl font-semibold text-center mb-4">Enter Chat</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 mb-4 rounded bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full p-2 rounded bg-blue-600 hover:bg-blue-500"
          >
            Start Chatting
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <div className="flex-1 overflow-hidden relative">
        <div className="fixed top-0 left-0 right-0 bg-gray-800 text-center py-2 border-b border-gray-700">
          <h1 className="text-xl font-semibold">Sweet Chats</h1>
        </div>
        <div className="pt-16 pb-24 overflow-y-auto px-4">
          <ul className="space-y-4">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`flex ${
                  msg.username === username ? "flex-row-reverse" : "flex-row"
                } items-start space-x-2`}
              >
                <div
                  className={`flex-shrink-0 ${
                    msg.username === username ? "ml-2" : "mr-2"
                  }`}
                >
                  <Image
                    src={avatars[msg.username] || "/ravish.png"}
                    alt={`${msg.username}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-600"
                  />
                </div>
                <div
                  className={`flex-1 p-3 rounded-lg ${
                    msg.username === username
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-200"
                  } max-w-full overflow-hidden`}
                >
                  <p className="text-sm font-semibold">{msg.username}</p>
                  <p className="text-base break-words whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
              </li>
            ))}
            <li id="chat-end"></li>
          </ul>
        </div>
        <form
          onSubmit={sendMessage}
          className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 flex items-center"
        >
          <div className="relative flex-1">
            <textarea
              ref={inputRef} // Assign ref to textarea
              value={message}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              rows={1}
              className="w-full p-2 pr-14 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:border-blue-500 resize-none overflow-hidden"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 disabled:text-blue-400"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
