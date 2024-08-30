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
  const [userStatus, setUserStatus] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    // Initialize Socket.IO client
    socket = io();

    // Listen for incoming messages
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Listen for user status updates
    socket.on("user status", (status) => {
      setUserStatus(status);
    });

    // Listen for clear chat event
    socket.on("clear chat", () => {
      setMessages([]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleUserClick = (user) => {
    setUsername(user);
    setLoggedIn(true);
    socket.emit("set username", user);
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
        inputRef.current.style.height = "auto";
        inputRef.current.focus();
      }
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const clearChat = () => {
    socket.emit("clear chat");
    setMessages([]);
  };

  const refreshPage = () => {
    window.location.reload();
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
        {Object.keys(avatars).map((user) => (
          <div key={user} className="flex items-center justify-center">
            <Image
              src={avatars[user]}
              alt={user}
              width={200}
              height={200}
              className="rounded-full border-4 border-gray-600 shadow-lg cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-125 active:scale-95"
              onClick={() => handleUserClick(user)}
            />
          </div>
        ))}
      </div>
    );
  }

  // Determine which user’s status to show
  const otherUser = username === "Ravish" ? "Dipu" : "Ravish";
  const otherUserStatus = userStatus[otherUser];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <div className="flex-1 overflow-hidden relative">
        <div className="fixed z-20 top-0 left-0 right-0 bg-gray-800 text-center py-4 border-b border-gray-700">
          <div className="flex items-center justify-between px-4">
            <h1 className="text-xl font-serif">Status</h1>
            <button
              onClick={clearChat}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:from-red-500 hover:to-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Clear
            </button>
            <button
              onClick={refreshPage}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-full font-bold shadow-lg hover:from-green-500 hover:to-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Refresh
            </button>
          </div>
          <div className="flex items-center space-x-2 justify-center mt-2">
            <div className="flex items-center space-x-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  otherUserStatus === "online" ? "bg-green-500" : "bg-gray-500"
                }`}
              ></span>
              <span className="text-sm text-gray-400">{otherUser}</span>
            </div>
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
                  className={`relative flex-shrink-0 ${
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
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                      userStatus[msg.username] === "online"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  ></span>
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
              ref={inputRef}
              value={message}
              onChange={handleInputChange}
              placeholder="Message..."
              rows={1}
              className="w-full h-full bg-gray-800 text-gray-200 resize-none placeholder:text-gray-500 placeholder:font-light placeholder:text-sm focus:outline-none"
              style={{
                padding: "0.5rem 2rem",
                boxSizing: "border-box",
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
