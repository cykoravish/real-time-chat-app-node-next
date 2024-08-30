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

    // Listen for clear chat event
    socket.on("clear chat", () => {
      setMessages([]); // Clear messages in the state
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleRavishClick = () => {
    setUsername("Ravish");
    setLoggedIn(true);
  };
  const handleDipuClick = () => {
    setUsername("Dipu");
    setLoggedIn(true);
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

  // Handle Clear Chat
  const clearChat = () => {
    socket.emit("clear chat"); // Emit clear chat event to the server
    setMessages([]); // Clear messages in the current user's state
  };

  useEffect(() => {
    const chatEndRef = document.getElementById("chat-end");
    if (chatEndRef) {
      chatEndRef.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!loggedIn) {
    return (
      <div className="h-screen flex flex-col gap-10 pt-20 items-center p-4 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="flex items-center justify-center">
          <Image
            src={"/ravish.png"}
            alt={"Ravish"}
            width={200}
            height={200}
            className="rounded-full border-4 border-gray-600 shadow-lg cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-125 active:scale-95"
            onClick={handleRavishClick}
          />
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={"/dipu.png"}
            alt={"Dipu"}
            width={200}
            height={200}
            className="rounded-full border-4 border-gray-600 shadow-lg cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-125 active:scale-95"
            onClick={handleDipuClick}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <div className="flex-1 overflow-hidden relative">
        <div className="fixed top-0 left-0 right-0 bg-gray-800 text-center py-4 border-b border-gray-700">
          <div className="flex items-center justify-around">
            <h1 className="text-xl font-semibold">Sweet Chats</h1>
            <button
              onClick={clearChat}
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-500 transition-colors"
            >
              Clear Chat
            </button>
          </div>
        </div>
        <div className="pt-24 pb-24 overflow-y-auto px-4">
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
          className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex items-center rounded-full min-h-14 px-4 overflow-hidden mb-3"
        >
          <div className="relative flex-1 h-auto flex items-center justify-center">
            <textarea
              ref={inputRef} // Assign ref to textarea
              value={message}
              onChange={handleInputChange}
              placeholder="Message..."
              rows={1}
              className="w-full h-full bg-gray-800 text-gray-200 resize-none placeholder:text-gray-500 placeholder:font-light placeholder:text-sm focus:outline-none" // Added padding-right to prevent overlap
              style={{
                padding: "0.5rem 2rem", // Adjust padding for better alignment
                boxSizing: "border-box", // Ensure padding doesn't affect width
              }}
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="text-blue-500 disabled:text-blue-700 h-10 px-4 flex items-center justify-center rounded-lg font-bold"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
