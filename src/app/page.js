"use client";

import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Image from "next/image";
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import Link from "next/link";

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
  const [clickedUser, setClickedUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [image, setImage] = useState(null); // New state for image
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    const serverURL =
      process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "https://ravish.fun";
    // Initialize Socket.IO client
    socket = io(serverURL, {
      transports: ["websocket"], // Use WebSocket for better performance
      withCredentials: true, // Ensure credentials are sent
    });

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

    // Listen for incoming file
    socket.on("chat file", (file) => {
      setMessages((prevMessages) => [...prevMessages, file]);
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

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message?.trim() || fileInputRef.current.files.length > 0) {
      let chatMessage = {
        username,
        message,
      };

      if (fileInputRef.current.files.length > 0) {
        const file = fileInputRef.current.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          chatMessage = {
            ...chatMessage,
            file: reader.result,
            fileName: file.name,
          };
          socket.emit("chat file", chatMessage);
          fileInputRef.current.value = ""; // Clear file input
        };
        reader.readAsDataURL(file); // Read file as data URL
      } else {
        socket.emit("chat message", chatMessage);
      }
      setMessage("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
        inputRef.current.focus();
      }
    }
    setSelectedImage(null);
  };

  const handleInputChange = (e) => {
    setMessage(e?.target.value);

    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        const fileData = {
          username,
          file: reader.result,
          fileName: file.name,
          fileType: file.type,
        };
        // console.log("fileData", fileData)
        // socket.emit("chat file", fileData);
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
    // handleInputChange();
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

  useEffect(() => {
    let isBackNavigation = false;
    // Handle the back button press (popstate event)
    const handlePopState = () => {
      isBackNavigation = true;
      window.history.pushState(null, null, window.location.href); // Prevent back navigation
      alert("Are you sure you want to exit the website?");
    };

    // Prevent the unload of the page only if it's a back navigation
    const handleBeforeUnload = (e) => {
      if (isBackNavigation) {
        e.preventDefault();
        e.returnValue = ""; // Required for the confirmation dialog to show
      }
    };

    // Listen for the popstate event (back/forward navigation)
    window.addEventListener("popstate", handlePopState);

    // Listen for the beforeunload event
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Push state to prevent back navigation
    window.history.pushState(null, null, window.location.href);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!loggedIn) {
    const handleUserClickWithEffect = (user) => {
      setClickedUser(user); // Trigger the hover effect for the clicked user
      setTimeout(() => {
        handleUserClick(user); // Proceed with the original action
        setClickedUser(null); // Reset the clicked user
      }, 100); // Short delay to show the hover effect (0.1 seconds)
    };

    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-r from-pink-200 via-rose-300 to-pink-400">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-3xl space-y-10 md:space-y-0 md:space-x-16">
          {Object.keys(avatars).map((user) => (
            <div
              key={user}
              className={`relative flex flex-col items-center group transform transition-all duration-700 ${
                clickedUser === user ? "scale-110" : ""
              }`}
              onClick={() => handleUserClickWithEffect(user)}
            >
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-tr from-pink-500 to-red-500 rounded-full opacity-50 blur-lg transition-all duration-700 ${
                    clickedUser === user ? "blur-sm" : ""
                  }`}
                ></div>
                <Image
                  src={avatars[user]}
                  alt={user}
                  width={200}
                  height={200}
                  className={`rounded-full border-4 border-white shadow-2xl cursor-pointer transition-transform duration-700 ease-in-out ${
                    clickedUser === user ? "scale-125 rotate-6" : ""
                  }`}
                />
              </div>
              <h1
                className="absolute text-xl font-bold tracking-wide text-white"
                style={{
                  left: "50%",
                  top: "80%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {user}
              </h1>
            </div>
          ))}
        </div>

        {/* Heart Icon with Button */}
        <div className="mt-12">
          <Link href={"/baby"}>
            <button
              type="button"
              className="relative py-3 px-6 inline-flex items-center text-lg font-semibold text-white rounded-full shadow-lg bg-gradient-to-r from-rose-400 to-red-500 hover:from-pink-500 hover:to-red-600 focus:outline-none transition-all duration-700 transform hover:scale-110"
            >
              <span className="mr-2">💖</span> Sweet Notes
            </button>
          </Link>
        </div>

        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="floating-heart absolute bottom-0 left-1/4 w-24 h-24 bg-rose-400 rounded-full opacity-50 blur-2xl"></div>
          <div className="floating-heart absolute top-10 right-1/3 w-32 h-32 bg-pink-300 rounded-full opacity-75 blur-3xl"></div>
          <div className="floating-heart absolute top-1/4 left-1/3 w-16 h-16 bg-red-400 rounded-full opacity-50 blur-xl"></div>
        </div>
      </div>
    );
  }

  // Determine which user’s status to show
  const otherUser = username === "Ravish" ? "Dipu" : "Ravish";
  const otherUserStatus = userStatus[otherUser];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <div className="flex-1 overflow-hidden relative">
        <div className="fixed z-20 top-0 left-0 right-0 bg-gray-900 text-center py-3 border-b border-gray-700 shadow-lg">
          <div className="flex items-center justify-between px-4">
            {/* User Status and Name */}
            <div className="flex items-center space-x-2">
              <span
                className={`w-4 h-4 rounded-full ${
                  otherUserStatus === "online" ? "bg-green-500" : "bg-gray-500"
                }`}
              ></span>
              <span className="text-base text-gray-300 font-semibold">
                {otherUser}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={clearChat}
                className="bg-red-600 text-white text-sm px-5 py-2 rounded-full font-bold shadow-lg hover:bg-red-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-700"
              >
                Clear
              </button>
              <button
                onClick={refreshPage}
                className="bg-green-600 text-white text-sm px-5 py-2 rounded-full font-bold shadow-lg hover:bg-green-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 active:bg-green-700"
              >
                ReStart
              </button>
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
                      : "bg-gray-800 text-gray-200"
                  } max-w-full overflow-hidden`}
                >
                  <p className="text-sm font-semibold text-cyan-300">
                    {msg.username}
                  </p>
                  {msg.message && (
                    <p className="text-base break-words whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  )}
                  {msg.file && (
                    <Image
                      src={msg.file}
                      alt={msg.fileName}
                      width={500}
                      height={500}
                      className="max-w-xs w-48 h-48 rounded-lg shadow-md"
                    />
                  )}
                </div>
              </li>
            ))}
            <div id="chat-end"></div>
          </ul>
        </div>

        {/* Image Preview */}
        {selectedImage && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2">
            <Image
              width={200}
              height={200}
              src={selectedImage}
              alt="Selected Preview"
              className="w-48 h-48 object-cover rounded-full shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 rounded-full text-white bg-red-500 p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              aria-label="Remove Image"
            >
              <IoMdCloseCircle className="w-10 h-10" />
            </button>
          </div>
        )}

        <form
          onSubmit={sendMessage}
          className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex items-center rounded-full min-h-14 px-4 overflow-hidden mb-3"
        >
          <div className="relative flex-1 h-auto flex items-center justify-between space-x-2">
            {/* Image Upload Icon */}
            <label htmlFor="file-upload" className="cursor-pointer">
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <HiOutlinePhotograph className="w-6 h-6 text-gray-400 hover:text-gray-300 transition-colors duration-200 ease-in-out" />
            </label>

            {/* Message Input */}
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

            {/* Send Button */}
            <button
              type="submit"
              disabled={!(message?.trim() || selectedImage)}
              className="text-blue-500 disabled:text-gray-400 h-10 px-4 flex items-center justify-center rounded-lg font-bold transition-transform transform hover:scale-105 duration-150 ease-in-out"
            >
              <IoSend className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
