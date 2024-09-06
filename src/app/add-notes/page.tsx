"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FloatingNavDemo } from "@/components/Navbar";

export default function Notes() {
  const [messageNote, setMessageNote] = useState<string>("");

  const handleNoteSubmit = () => {};

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
          <Button onClick={handleNoteSubmit}>Add</Button>
        </div>
      </div>
    </>
  );
}
