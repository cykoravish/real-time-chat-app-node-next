/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Image from "next/image";
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoSend } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

import { FormEvent } from "react";
import { FloatingNavDemo } from "@/components/Navbar";

// Example avatars for users
const avatars: any = {
  Ravish: "/ravish.png",
  Deepu: "/deepu.png",
  // Add more avatars as needed
};

let socket: any;

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [userStatus, setUserStatus] = useState<any>({});
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [username, setUsername] = useState<any>("");
  console.log("status: ", userStatus);
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    const serverURL: any = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;
    console.log("serverurl", serverURL);
    // Initialize Socket.IO client
    socket = io(serverURL, {
      transports: ["websocket"], // Use WebSocket for better performance
      withCredentials: true, // Ensure credentials are sent
    });

    // Listen for incoming messages
    socket.on("chat message", (msg: any) => {
      setMessages((prevMessages: any[]) => [...prevMessages, msg]);
    });

    // Listen for user status updates
    socket.on("user status", (status: any) => {
      console.log("gettig status,", status);
      setUserStatus(status);
    });

    // Listen for clear chat event
    socket.on("clear chat", () => {
      setMessages([]);
    });

    // Listen for incoming file
    socket.on("chat file", (file: any) => {
      setMessages((prevMessages) => [...prevMessages, file]);
    });

    console.log("---------", username);
    socket.emit("set username", username);

    return () => {
      socket.disconnect();
    };
  }, []);


  interface ChatMessage {
    username: string | null;
    message: string;
    file?: string | ArrayBuffer | null; // Data URL or null
    fileName?: string;
  }

  const sendMessage = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const files = fileInputRef.current?.files;
    if (message?.trim() || (files && files.length > 0)) {
      let chatMessage: ChatMessage = {
        username,
        message,
      };
      console.log("chatMessage: :", chatMessage);

      if (files && files.length > 0) {
        const file: File = files[0];
        const reader: FileReader = new FileReader();
        reader.onloadend = () => {
          chatMessage = {
            ...chatMessage,
            file: reader.result,
            fileName: file.name,
          };
          socket.emit("chat file", chatMessage);
          if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear file input
          }
        };
        reader.readAsDataURL(file); // Read file as data URL
      } else {
        console.log("emit", chatMessage);
        socket.emit("chat message", chatMessage);
        socket.emit("set username", username);
      }
      setMessage("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
        inputRef.current.focus();
      }
    }
    setSelectedImage(null);
  };
  // console.log(messages);
  const handleInputChange = (e: any) => {
    setMessage(e?.target.value);

    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleFileChange = (e: any) => {
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

  // const refreshPage = () => {
  //   window.location.reload();
  // };

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
      window.history.pushState(null, null as any, window.location.href); // Prevent back navigation
      alert("Are you sure you want to exit the website?");
    };

    // Prevent the unload of the page only if it's a back navigation
    const handleBeforeUnload = (e: any) => {
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
    window.history.pushState(null, null as any, window.location.href);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Determine which user’s status to show
  const otherUser = username === "Ravish" ? "Deepu" : "Ravish";
  const otherUserStatus = userStatus[otherUser];

  return (
    <div className="min-h-screen flex flex-col dark:bg-black text-gray-200">
      <div className="overflow-hidden">
        <div className="dark:bg-black text-center border-b shadow-lg">
          <div className="flex items-center justify-center px-4">
            <FloatingNavDemo />
          </div>
        </div>
        <div className="pt-32 pb-24 overflow-y-auto px-4">
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
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 rounded-full text-white bg-pink-500 p-1 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300"
              aria-label="Remove Image"
            >
              <IoMdCloseCircle className="w-10 h-10" />
            </button>
          </div>
        )}

        <form
          onSubmit={sendMessage}
          className="fixed bottom-0 left-0 right-0 dark:bg-black border-t border-gray-500 flex items-center rounded-full min-h-14 px-4 overflow-hidden mb-3"
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
              className="w-full h-full dark:bg-black text-gray-200 resize-none placeholder:text-gray-500 placeholder:font-light placeholder:text-sm focus:outline-none"
              style={{
                padding: "0.5rem 2rem",
                boxSizing: "border-box",
              }}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!(message?.trim() || selectedImage)}
              className="text-green-500 disabled:text-gray-400 h-10 px-4 flex items-center justify-center rounded-lg font-bold transition-transform transform hover:scale-105 duration-150 ease-in-out"
            >
              <IoSend className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
