"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FloatingNavDemo } from "@/components/Navbar";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "@/components/ui/moving-border";

export default function Notes() {
  const [messageNote, setMessageNote] = useState<string>("");
  const [loading, setLoading] = useState(false);

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
          markedAsRead: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessageNote("");
      toast.success("Added Successfully. visit home page to see notes");
    } catch (error) {
      setLoading(false);
      console.log("error in api :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FloatingNavDemo />
      <div className="h-screen w-full flex justify-center items-center p-5">
        <div className="grid w-full gap-8">
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
              {loading ? "loading.." : "Add"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
