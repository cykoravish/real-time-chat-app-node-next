"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { showErrorToast } from "@/utils/toastUtils";
import { showSuccessToast } from "@/utils/toastUtils";
import Link from "next/link";
// import "dotenv/config";

export default function Baby() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [messageData, setMessageData] = useState({ name: "", message: "" });

  const AUTO_LOGOUT_TIME = 4 * 60 * 1000;
  const SESSION_TIMEOUT = 15 * 60 * 1000;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.toLowerCase());
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const validPasswords = process.env.NEXT_PUBLIC_PASSWORDS.split(",");
    if (validPasswords.includes(password)) {
      const currentTime = new Date().getTime();
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("lastLoginTime", currentTime.toString());
      setIsAuthenticated(true);
      showSuccessToast("I love youuu baby");
      setPassword("");
    } else {
      showErrorToast("ops, baby you entered wrong password");
      setPassword("");
    }
  };

  const handleMessageChange = (e) => {
    setMessageData({
      ...messageData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("/api/message", messageData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(resp.data);
      setMessageData({ name: "", message: "" }); // Clear form after submission
    } catch (error) {
      console.error("Error in API:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsAuthenticated(loggedIn);
  }, []);

  useEffect(() => {
    const checkAuthentication = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const lastLoginTime = parseInt(
        localStorage.getItem("lastLoginTime") || "0",
        10
      );
      const currentTime = new Date().getTime();
      setIsAuthenticated(loggedIn); ////

      if (loggedIn && currentTime - lastLoginTime < SESSION_TIMEOUT) {
        setIsAuthenticated(true);
      } else {
        // If session has expired or not logged in
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("lastLoginTime");
        setIsAuthenticated(false);
      }
    };

    // Set up inactivity timer
    let logoutTimer = setTimeout(() => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("lastLoginTime");
      setIsAuthenticated(false);
    }, AUTO_LOGOUT_TIME);

    // Reset timer on user activity
    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("lastLoginTime");
        setIsAuthenticated(false);
      }, AUTO_LOGOUT_TIME);
    };

    // Attach event listeners for user activity
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // Check authentication on mount
    checkAuthentication();

    // Clean up event listeners and timer on unmount
    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-red-300 to-pink-400">
      {!isAuthenticated ? (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-pink-200 via-red-300 to-pink-400">
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-300 to-pink-500 text-white">
            <div className="text-2xl font-bold">Sweet Notes</div>
            <Link href={"/"}>
              <button
                type="button"
                className="py-2 px-4 text-sm font-medium rounded-lg bg-white text-pink-500 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300"
              >
                Home
              </button>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center animate__animated animate__fadeIn animate__delay-1s">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Enter Password
              </h1>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition duration-300"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-gradient-to-r from-rose-400 to-red-500 text-white rounded-lg hover:from-pink-500 hover:to-red-600 transition duration-300 transform hover:scale-105"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-300 to-pink-500 text-white">
              <div className="text-2xl font-bold">Sweet Notes</div>
              <button
                type="button"
                className="py-2 px-4 text-sm font-medium rounded-lg bg-white text-pink-500 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 items-center justify-center p-6 bg-gradient-to-r from-pink-50 to-pink-100">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  Add Notes
                </h1>
                <form onSubmit={handleMessageSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={messageData.name}
                      onChange={handleMessageChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Your message"
                      value={messageData.message}
                      onChange={handleMessageChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition duration-300"
                      rows="4"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-gradient-to-r from-rose-400 to-red-500 text-white rounded-lg hover:from-pink-500 hover:to-red-600 transition duration-300"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
