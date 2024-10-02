"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { ImSpinner10 } from "react-icons/im";

interface Message {
  _id: any;
  username: any;
  message: any;
  createdAt: any;
  markedAsRead: any;
  audio_url?: string;
}

export default function CardHoverEffectDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(10);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.post(`/api/getmsg?limit=${page}`);
        setMessages(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();
  }, [page]);

  const seenMessages = async (_id: any) => {
    try {
      const res = await axios.post("/api/markedSeen", { _id: _id });
      window.location.reload();
    } catch (error) {
      console.error("Failed to seen messages", error);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const res = await axios.post(`/api/deleteMessage/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Failed to seen messages", error);
    }
  };

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 10);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  return (
    <>
      <div className="border-b border-gray-700"></div>
      <div className="max-w-5xl mx-auto px-8 mt-10 relative">
        <HoverEffect
          items={messages}
          markedAsRead={seenMessages}
          deleteMessage={deleteMessage}
        />
        <div className="fixed bottom-14 right-14 z-50"></div>
        <div className="flex justify-center items-center pb-8 text-4xl">
          {loading && <ImSpinner10 className="animate-spin" />}
        </div>
      </div>
    </>
  );
}
