import { useAuth } from "@/AuthContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiTrash2, FiCheckCircle } from "react-icons/fi";

const MessageBox = ({
  message,
  title,
  isExpanded,
  onToggle,
  onMarkAsDelete,
  onMarkAsSeen,
  id,
}) => {
  // const [isExpanded, setIsExpanded] = useState(false);
  const [isSeen, setIsSeen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const updatedData = async () => {
    const data = await axios.post(
      "/api/update",
      { isSeen, isDeleted, id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("updatedData", data.data.data);
  };


  const handleMarkAsSeen = async () => {
    setIsSeen(true);
    onMarkAsSeen();
    await updatedData();
  };
  const handleMarkAsDelete = async () => {
    setIsDeleted(true);
    onMarkAsDelete();
    await updatedData();
  };

  return (
    <div
      className={`border border-pink-300 p-4 rounded-xl shadow-lg bg-white cursor-pointer mb-4 transition-all duration-300 ${
        isExpanded ? "shadow-xl transform scale-105" : ""
      }`}
      onClick={onToggle}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 break-words whitespace-pre-wrap">
          {title}
        </h2>
        <div className="flex space-x-2">
          <button
            className="text-red-500 hover:text-red-700 transition duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleMarkAsDelete();
            }}
          >
            <FiTrash2 size={20} />
          </button>
          <button
            className={`${
              isSeen ? "text-green-500" : "text-gray-500"
            } hover:text-green-700 transition duration-200`}
            onClick={(e) => {
              e.stopPropagation();
              handleMarkAsSeen();
            }}
          >
            <FiCheckCircle size={20} />
          </button>
        </div>
      </div>
      {isExpanded ? (
        <p className="text-gray-700 mt-2 break-words whitespace-pre-wrap">
          {message}
        </p>
      ) : (
        <p className="text-gray-500 mt-2 truncate">
          {message.length > 50 ? `${message.slice(0, 50)}...` : message}
        </p>
      )}
    </div>
  );
};

const Messages = () => {
  const [messagesData, setMessagesData] = useState([]);
  const username = localStorage.getItem("username");
  const { reload } = useAuth();
  console.log(username);
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  const handleToggleExpansion = (id) => {
    setExpandedMessageId((prevId) => (prevId === id ? null : id));
  };

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

  const handleMarkAsDelete = (id) => {
    console.log(`Delete message with ID: ${id}`);
    // Add your delete logic here
  };
  const handleMarkAsSeen = (id) => {
    console.log(`Mark message with ID: ${id} as seen`);
    // Add your mark as seen logic here
  };

  return (
    <div className="p-6">
      {messagesData.map((message) => (
        <MessageBox
          key={message._id}
          title={message.name}
          message={message.message}
          isExpanded={expandedMessageId === message._id}
          onToggle={() => handleToggleExpansion(message._id)}
          onMarkAsDelete={() => handleMarkAsDelete(message._id)}
          onMarkAsSeen={() => handleMarkAsSeen(message._id)}
          id={message._id}
        />
      ))}
    </div>
  );
};

export default Messages;
