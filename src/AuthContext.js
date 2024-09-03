"use client";

import React, { createContext, useState, useContext } from "react";

// Create a context for authentication
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reload, setReload] = useState(false);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, reload, setReload }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
