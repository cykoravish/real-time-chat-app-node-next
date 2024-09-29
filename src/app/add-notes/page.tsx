"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FloatingNavDemo } from "@/components/Navbar";
import { showToast } from "@/components/LoveToast";
import axios from "axios";
import { Button } from "@/components/ui/moving-border";
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
      showToast("baby send something","error");
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
      showToast("Added Successfully. visit home page to see notes","success");
    } catch (error: any) {
      setLoading(false);
      showToast(error.response.data.error,"error");
      console.log("error in api :", error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FloatingNavDemo />
      <div className="h-screen w-full flex justify-center items-center p-5">
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
            placeholder="Type here what's in your mind."
            value={messageNote}
            onChange={(e) => setMessageNote(e.target.value)}
          />
          <div className="flex justify-center items-center">
            <Button
              onClick={handleNoteSubmit}
              disabled={loading || isRecording || isProcessing}
              borderRadius="1.75rem"
              className={`bg-gray-300 dark:bg-gray-700 text-gray-400 dark:text-gray-500 font-semibold border-neutral-200 dark:border-pink-800 ${
                loading || isRecording || isProcessing
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-white dark:bg-black text-black dark:text-pink-500"
              }`}
            >
              {loading ? "loading..." : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
