// src/components/SomeComponent.tsx
"use client"; // Ensure this is treated as a client-side component

import React from "react";
import { useCookie } from "../context/CookieContext";

const SomeComponent = () => {
  const { username, setUsername } = useCookie();

  const handleLogout = () => {
    document.cookie = "username=; Path=/; Max-Age=0; SameSite=Strict"; // Remove the cookie
    setUsername(""); // Update context state
  };
  console.log("username is ", username);
  return (
    <div>
      <p>Username: {username}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SomeComponent;
