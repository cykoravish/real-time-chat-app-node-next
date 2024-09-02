import { toast, Toaster } from "react-hot-toast";

// Function to display success toast with a custom message
export const showSuccessToast = (message = "Operation Successful!") => {
  toast.dismiss(); // Dismiss the previous toast if any
  toast.success(message, {
    duration: 6000, // Duration of 6 seconds
    style: {
      background: "linear-gradient(135deg, #FFB6C1, #FF69B4)", // Romantic gradient background
      color: "#fff",
      borderRadius: "15px",
      boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
      fontFamily: "'Cursive', sans-serif", // Romantic font style
    },
    icon: "💖", // Heart icon for success
    onClick: () => {
      toast.dismiss(); // Dismiss toast on click
    },
  });
};

// Function to display error toast with a custom message
export const showErrorToast = (message = "Something went wrong!") => {
  toast.dismiss(); // Dismiss the previous toast if any
  toast.error(message, {
    duration: 6000, // Duration of 6 seconds
    style: {
      background: "linear-gradient(135deg, #FF69B4, #FF1493)", // Romantic gradient background
      color: "#fff",
      borderRadius: "15px",
      boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
      fontFamily: "'Cursive', sans-serif", // Romantic font style
    },
    icon: "💔", // Broken heart icon for error
    onClick: () => {
      toast.dismiss(); // Dismiss toast on click
    },
  });
};

// Rendering the Toaster
export const ToastComponent = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      style: {
        background: "#fff",
        color: "#333",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      },
    }}
  />
);
