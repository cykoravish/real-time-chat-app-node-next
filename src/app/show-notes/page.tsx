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
}

// export default function Home() {
//   const [username, setUsername] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const [status, setStatus] = useState<string>("");
//   const [messages, setMessages] = useState<Message[]>([]);

//   // Fetch messages when the component loads
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get("/api/getmsg");
//         setMessages(res.data.data);
//         console.log("messages", messages);
//       } catch (error) {
//         console.error("Failed to fetch messages", error);
//       }
//     };

//     fetchMessages();
//   }, []);

//   return (
//     <div>
//       <FloatingNavDemo />
//       <h1>Send Message</h1>

//       {status && <p>{status}</p>}

//       <h2>Messages</h2>
//       <ul>
//         {messages?.map((msg, index) => (
//           <li key={index}>
//             <strong>{msg.username}</strong>: {msg.message} <br />
//             <small>{new Date(msg.createdAt).toLocaleString()}</small>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default function CardHoverEffectDemo() {
  const [username, setUsername] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/getmsg");
        setMessages(res.data.data);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-8 mt-20">
      <FloatingNavDemo />
      {/* <HoverEffect items={projects} /> */}
      <HoverEffect items={messages} />
    </div>
  );
}
export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];
