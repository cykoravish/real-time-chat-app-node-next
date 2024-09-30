"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { showToast } from "@/components/LoveToast";
import axios from "axios";
import CloudinaryUploadBtn from "@/components/CloudinaryUploadBtn";
import AudioRecorder from "@/components/AudioRecorder";
import { MdCleaningServices } from "react-icons/md";

export default function Notes() {
  const [messageNote, setMessageNote] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [audioURL, setAudioURL] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const clearAudio = () => {
    setAudioURL("");
    setImageURL("");
    setMessageNote("");
    setIsRecording(false);
    showToast("ho gya sab clear baby", "success");
  };

  const handleNoteSubmit = async () => {
    if (messageNote.trim() === "" && imageURL === "" && audioURL === "") {
      showToast("baby send something", "error");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "/api/message",
        {
          username: localStorage.getItem("username"),
          message: messageNote,
          image_url: imageURL,
          markedAsRead: false,
          audio_url: audioURL,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessageNote("");
      setImageURL("");
      setAudioURL("");
      showToast("Added Successfully. visit home page to see notes", "success");
    } catch (error: any) {
      setLoading(false);
      showToast(error.response.data.error, "error");
      console.log("error in api :", error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border-t border-gray-700 h-screen w-full flex justify-center items-center p-5">
        <div className="grid w-full gap-8">
          <div className="flex justify-center items-center gap-4">
            <CloudinaryUploadBtn
              setImageURL={setImageURL}
              imageURL={imageURL}
            />
            <div className="relative">
              <AudioRecorder
                audioURL={audioURL}
                setAudioURL={setAudioURL}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
              />
            </div>
            <div>
              <MdCleaningServices
                size={25}
                className="text-gray-400 hover:text-pink-500"
                onClick={clearAudio}
              />
            </div>
          </div>
          <Textarea
            placeholder="Baby likh do kuch man ki baat yaha 😘"
            value={messageNote}
            onChange={(e) => setMessageNote(e.target.value)}
          />
          <div className="flex justify-center items-center">
            <button
              onClick={handleNoteSubmit}
              className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 ${
                loading || isRecording || isProcessing
                  ? "opacity-50 cursor-not-allowed bg-gray-400"
                  : "bg-white dark:bg-black text-black dark:text-pink-500"
              }`}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {loading ? "loading..." : "Submit"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
