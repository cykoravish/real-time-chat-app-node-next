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
        console.log(event);
        console.log(info);
        if (event === "success") {
          // do anything here
          setImageURL(info?.url);
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
                  fill // Use the fill prop instead of layout="fill"
                  sizes="(max-width: 768px) 100vw, 50vw" // This line added to improve performance
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
