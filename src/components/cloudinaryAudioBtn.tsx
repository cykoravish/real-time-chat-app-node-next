// "use client";

// import React from "react";
// import { CldUploadWidget } from "next-cloudinary";
// import toast from "react-hot-toast";
// import { AiFillAudio } from "react-icons/ai";
// import { FaPaperPlane } from "react-icons/fa";

// export default function CloudinaryAudioBtn({ audioURL, setAudioURL }: any) {
//   return (
//     <div>
//       <CldUploadWidget
//         uploadPreset="cykoravish"
//         options={{
//           folder: "audios",
//           multiple: false,
//           resourceType: "video",
//           clientAllowedFormats: ["mp3", "wav", "ogg", "m4a", "opus"],
//           sources: ["local", "camera"],
//           showPoweredBy: false,
//           styles: {
//             palette: {
//               window: "#2e2e2e", // Dark background for the widget window
//               sourceBg: "#1e1e1e", // Dark background for source buttons
//               windowBorder: "#8a8a8a", // Border color for the widget window
//               tabIcon: "#ffffff", // Tab icon color
//               inactiveTabIcon: "#888", // Color for inactive tabs
//               menuIcons: "#ffffff", // Icons in the menu
//               link: "#ffffff", // Link color (e.g., for "Add URL" option)
//               action: "#ff4081", // Action button color (e.g., the "Upload" button)
//               inProgress: "#00ff00", // Progress bar color
//               complete: "#00ff00", // Color when upload is complete
//               error: "#ff0000", // Error message color
//               textDark: "#ffffff", // Text color in dark theme
//               textLight: "#8a8a8a", // Text color for lighter elements
//             },
//           },
//         }}
//         onSuccess={({ event, info }: any) => {
//           if (event === "success") {
//             console.log("Audio uploaded successfully:", info.secure_url);
//             setAudioURL(info.secure_url);
//           }
//         }}
//         onError={(error: any) => {
//           console.error("Upload Error:", error);
//           toast.error("Audio upload failed. Please try again.");
//         }}
//       >
//         {({ open }) => (
//           <>
//             <button
//               type="button"
//               onClick={() => open()}
//               className="relative border border-pink-500 p-3 rounded-lg"
//             >
//               {audioURL && (
//                 <span className="absolute top-[5%] right-[20%] text-sm font-bold text-pink-500">
//                   1
//                 </span>
//               )}
//               <AiFillAudio size={23} />
//             </button>
//           </>
//         )}
//       </CldUploadWidget>
//     </div>
//   );
// }
