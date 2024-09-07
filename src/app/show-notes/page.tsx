"use client";
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { FloatingNavDemo } from "@/components/Navbar";

import { HoverEffect } from "@/components/ui/card-hover-effect";

interface Message {
  _id: any;
  username: any;
  message: any;
  createdAt: any;
  markedAsRead: any;
}

export default function CardHoverEffectDemo() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.post("/api/getmsg");
        setMessages(res.data.data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();
  }, []);

  const seenMessages = async (_id: any) => {
    try {
      const res = await axios.post("/api/markedSeen", { _id: _id });
    } catch (error) {
      console.error("Failed to seen messages", error);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto px-8 mt-20 relative">
        <FloatingNavDemo />
        <HoverEffect items={messages} markedAsRead={seenMessages} />
        <div className="fixed bottom-14 right-14 z-50"></div>
      </div>
    </>
  );
}
