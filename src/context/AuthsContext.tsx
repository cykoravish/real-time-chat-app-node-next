"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the shape of your context
interface AppContextType {
  username: any;
  setUsername: any;
}

// Create a default context value
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Define the state you want to share
  const [username, setUsername] = useState<any>("");
  return (
    <AppContext.Provider value={{ username, setUsername }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
