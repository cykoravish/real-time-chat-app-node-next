"use client";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { IoStopCircleOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import axios from "axios";

interface AudioRecorderProps {
  audioURL: string | null;
  setAudioURL: (url: string) => void;
  isRecording: boolean;
  setIsRecording: any;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  audioURL,
  setAudioURL,
  isRecording,
  setIsRecording,
}) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  let timerInterval: NodeJS.Timeout;

  const handleStartRecording = async () => {
    if (audioURL) {
      toast.error(
        "Baby dobara record krne ke lia pehle previous wali recoding ko clear kro"
      );
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);

    // Start the timer
    timerInterval = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000); // Increment every second

    const chunks: Blob[] = [];
    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      clearInterval(timerInterval); //stop the timer
      const blob = new Blob(chunks, { type: "audio/wav" });
      setAudioBlob(blob);
      await handleUploadAudio(blob);
    };
  };

  const handleStopRecording = () => {
    if (!isRecording && !audioURL) {
      toast.error(
        "Baby pehle recording start kro phir dabana is button ko stop krne ke lia😘"
      );
      return;
    }
    if (audioURL) {
      toast.error(
        "Baby recording store ho gyi ha ab send krr do add button se"
      );
      return;
    }
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    setIsProcessing(true);
    clearInterval(timerInterval);
  };

  const handleUploadAudio = async (audioBlob: Blob | null) => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("file", audioBlob);
    formData.append("upload_preset", "cykoravish");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        formData
      );
      console.log("Audio uploaded successfully:", response.data.secure_url);
      setAudioURL(response.data.secure_url);
      toast.success("Audio captured successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Audio upload failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 items-center relative">
        <button
          onClick={handleStartRecording}
          disabled={isRecording}
          className="flex items-center gap-2 p-2 rounded-md"
        >
          <span>
            {isRecording ? (
              <div className="relative flex justify-center items-center w-10 h-10">
                <FaMicrophone
                  size={25}
                  className="text-pink-500 hover:text-pink-400"
                />
                <div className="absolute w-10 h-10 rounded-full border-2 border-pink-500 opacity-75 animate-ping"></div>
              </div>
            ) : (
              <div className="relative">
                {audioURL && (
                  <span className="absolute text-pink-500 font-extrabold text-lg -top-4 -right-1 animate-bounce">
                    1
                  </span>
                )}
                <FaMicrophone
                  size={25}
                  className={`hover:text-pink-400 ${
                    !audioURL ? "text-gray-400" : "text-pink-500"
                  }`}
                />
              </div>
            )}
          </span>
        </button>
        {/* Display Timer */}

        {isRecording && (
          <span className="absolute text-lg font-semibold text-pink-500 -top-10 left-8 transform -translate-x-1/2">
            {`${Math.floor(recordingTime / 60)
              .toString()
              .padStart(2, "0")}:${(recordingTime % 60)
              .toString()
              .padStart(2, "0")}`}
          </span>
        )}
        {/* ///////////////////////////// */}
        {isProcessing && (
          <div className="absolute -top-10 left-8 transform -translate-x-1/2 flex space-x-2">
            <span className="block w-2 h-2 bg-pink-500 rounded-full animate-bounce"></span>
            <span className="block w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-150"></span>
            <span className="block w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-300"></span>
          </div>
        )}

        {/* ////////////////////////////// */}
        <button
          onClick={handleStopRecording}
          className={`hover:text-pink-500 flex items-center gap-2 p-2 rounded-full ${
            isRecording ? "text-pink-500" : "text-gray-400"
          }`}
        >
          <IoStopCircleOutline size={35} />
        </button>
      </div>
    </div>
  );
};

export default AudioRecorder;
