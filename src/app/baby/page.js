"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { showErrorToast } from "@/utils/toastUtils";
import { showSuccessToast } from "@/utils/toastUtils";
import Link from "next/link";
import { useAuth } from "@/AuthContext";
import PasswordEnter from "@/components/password";
import { FiPlus } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";
import Messages from "@/components/MessageBox";

export default function Baby() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { setReload, reload } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  // const [messageData, setMessageData] = useState({ name: "", message: "" });
  const [messageData, setMessageData] = useState("");
  const [loading, setLoading] = useState(false);

  const AUTO_LOGOUT_TIME = 4 * 60 * 1000;
  const SESSION_TIMEOUT = 15 * 60 * 1000;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

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
      showSuccessToast("Loggen In✔️");

      if (password === "red") {
        localStorage.setItem("username", "Ravish");
      } else {
        localStorage.setItem("username", "Deepu");
      }
      setPassword("");
    } else {
      showErrorToast("Wrong Password ❌");
      setPassword("");
    }
  };

  const handleMessageSubmit = async (e) => {
    const username = localStorage.getItem("username");
    e.preventDefault();
    // if (!messageData.name.trim()) {
    //   setMessageData({ ...messageData, name: username });
    // }
    if (!messageData) {
      showErrorToast("Baby note to likho 😘");
      return;
    }
    setLoading(true);
    const info = { name: username, message: messageData };
    try {
      const resp = await axios.post("/api/message", info, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setReload(!reload);
      setMessageData(""); // Clear form after submission
      handleClose();
      setLoading(false);
    } catch (error) {
      console.error("Error in API:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    showSuccessToast("Logged Out✔️");
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
        <PasswordEnter
          handlePasswordSubmit={handlePasswordSubmit}
          password={password}
          handlePasswordChange={handlePasswordChange}
        />
      ) : (
        <>
          <div className="flex flex-col min-h-screen relative">
            {/* Header Section */}
            <div className="fixed w-full flex justify-between items-center p-4 bg-gradient-to-r from-pink-300 to-pink-500 text-white">
              <div className="text-2xl font-bold">Sweet Notes</div>
              <button
                type="button"
                className="py-2 px-4 text-sm font-medium rounded-lg bg-white text-pink-500 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400 transition duration-300"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>

            {/* main content */}
            <div className="pt-20">
              <Messages />
            </div>

            {/* //add notes button */}
            <button
              onClick={handleOpen}
              className="right-9 bottom-9 fixed text-white bg-gradient-to-r from-rose-400 to-red-500 p-4 rounded-full shadow-lg hover:from-pink-500 hover:to-red-600 transition duration-300 flex items-center"
            >
              <FiPlus className="w-8 h-8" />
            </button>

            {/* Modal */}
            {isOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                onClick={handleClose}
              >
                <div
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-md w-full relative mx-4 sm:mx-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-pink-500 hover:text-pink-600"
                  >
                    <IoMdCloseCircle className="w-8 h-8" />
                  </button>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    Sweet Notes
                  </h1>
                  <form onSubmit={handleMessageSubmit} className="space-y-4">
                    {/* <div>
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
                    </div> */}
                    <div>
                      {/* <label htmlFor="message" className="block text-gray-700">
                        Add Note
                      </label> */}
                      <textarea
                        name="message"
                        placeholder="Leave a note here for your baby"
                        value={messageData}
                        onChange={(e) => setMessageData(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition duration-300"
                        rows="4"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className={`w-full py-2 px-4 bg-gradient-to-r from-rose-400 to-red-500 text-white rounded-lg transition duration-300 ${
                        loading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:from-pink-500 hover:to-red-600"
                      }`}
                      disabled={loading} // Disable button when loading
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                          </svg>
                          Loading...
                        </span>
                      ) : (
                        "Left a note"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
