"use client";

import React from "react";
import { CldUploadWidget } from "next-cloudinary";

export default function CloudinaryUploadBtn() {
  return (
    <CldUploadWidget
      uploadPreset="cykoravish"
      onSuccess={({ event, info }) => {
        console.log(event);
        console.log(info);
        if(event === "success"){
            // dp anything here
        }
      }}
    >
      {({ open }) => {
        return (
          <button className="bg-blue-300 p-4 rounded-lg" onClick={() => open()}>
            Upload an Image
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
