"use client";

import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { CiImageOn } from "react-icons/ci";
import Image from "next/image";

export default function CloudinaryUploadBtn({ setImageURL, imageURL }: any) {
  return (
    <CldUploadWidget
      uploadPreset="cykoravish"
      options={{
        folder: "chats",
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
    >
      {({ open }) => {
        return (
          <button
            className="bg-black text-white border border-pink-500 rounded-lg ml-2 w-12 h-12 relative"
            onClick={() => open()}
          >
            {imageURL === "" ? (
              <CiImageOn className="w-full h-full text-center font-bold" />
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
