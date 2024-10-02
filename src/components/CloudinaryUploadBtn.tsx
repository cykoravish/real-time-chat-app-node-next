"use client";

import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { FaImage } from "react-icons/fa6";
import Image from "next/image";
import toast from "react-hot-toast";

export default function CloudinaryUploadBtn({ setImageURL, imageURL }: any) {
  return (
    <CldUploadWidget
      uploadPreset="cykoravish"
      options={{
        folder: "chats",
        multiple: false,
        resourceType: "image",
        clientAllowedFormats: ["png", "jpg", "jpeg"],
        sources: ["local", "camera", "unsplash"],
        showPoweredBy: false,
        styles: {
          palette: {
            window: "#2e2e2e", // Dark background for the widget window
            sourceBg: "#1e1e1e", // Dark background for source buttons
            windowBorder: "#8a8a8a", // Border color for the widget window
            tabIcon: "#ffffff", // Tab icon color
            inactiveTabIcon: "#888", // Color for inactive tabs
            menuIcons: "#ffffff", // Icons in the menu
            link: "#ffffff", // Link color (e.g., for "Add URL" option)
            action: "#ff4081", // Action button color (e.g., the "Upload" button)
            inProgress: "#00ff00", // Progress bar color
            complete: "#00ff00", // Color when upload is complete
            error: "#ff0000", // Error message color
            textDark: "#ffffff", // Text color in dark theme
            textLight: "#8a8a8a", // Text color for lighter elements
          },
          fonts: {
            default: null,
            "'Roboto', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Roboto",
              active: true,
            },
          },
        },
      }}
      onSuccess={({ event, info }: any) => {
        if (event === "success") {
          const transformedUrl = info?.secure_url.replace(
            "/upload/",
            "/upload/w_350,h_400,c_fill/" // Fixed width and height (300x300)
          );
          setImageURL(transformedUrl);
        }
      }}
      onError={(error: any) => {
        console.error("Upload Error:", error);
        toast.error("Image upload failed. Please try again.");
      }}
    >
      {({ open }) => {
        return (
          <button
            className="text-white rounded-lg w-12 h-12 relative"
            onClick={() => open()}
          >
            {imageURL === "" ? (
              <FaImage size={30} className="text-gray-400 hover:text-blue-500 font-bold" />
            ) : (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={imageURL}
                  alt="Uploaded Image"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-full"
                />
              </div>
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
}

Image;
