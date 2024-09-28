"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FloatingNavDemo } from "@/components/Navbar";
import toast from "react-hot-toast";
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

  const clearAudio = () => {
    setAudioURL("");
    setImageURL("");
    setMessageNote("");
    setIsRecording(false);
    toast.success("ho gya sab clear baby");
  };

  const handleNoteSubmit = async () => {
    if (messageNote.trim() === "") {
      toast.error("baby type something");
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
      toast.success("Added Successfully. visit home page to see notes");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.error);
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
              <AudioRecorder audioURL={audioURL} setAudioURL={setAudioURL} isRecording={isRecording} setIsRecording={setIsRecording} />
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
              disabled={loading}
              borderRadius="1.75rem"
              className="bg-white dark:bg-black font-bold text-black dark:text-white border-neutral-200 dark:border-pink-800"
            >
              {loading ? "loading..." : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
