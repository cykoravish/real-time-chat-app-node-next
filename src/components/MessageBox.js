import { useAuth } from "@/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MessageBox = ({ message, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="border border-gray-300 p-4 rounded-lg shadow-md bg-white cursor-pointer mb-4"
      onClick={toggleExpansion}
    >
      <h2 className="text-lg font-semibold text-gray-800 break-words whitespace-pre-wrap">
        {title}
      </h2>
      {isExpanded ? (
        <p className="text-gray-700 mt-2 break-words whitespace-pre-wrap">
          {message}
        </p>
      ) : (
        <p className="text-gray-500 mt-2 truncate">
          {message.length > 10 ? `${message.slice(0, 50)}...` : message}
        </p>
      )}
    </div>
  );
};

const Messages = () => {
  const [messagesData, setMessagesData] = useState([]);
  const username = localStorage.getItem("username");
    const { reload } = useAuth();
  //   console.log(username);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get("/api/getdata");
        setMessagesData(data.data.data.reverse().slice(0, 10));
      } catch (error) {
        console.log("error in get req:", error);
      }
    };
    getData();
  }, [reload]);

  return (
    <div className="p-6">
      {messagesData.map((message) => (
        <MessageBox
          key={message._id}
          title={message.name}
          message={message.message}
        />
      ))}
    </div>
  );
};

export default Messages;
