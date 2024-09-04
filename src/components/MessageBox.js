import { useAuth } from "@/AuthContext";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { FiTrash2, FiCheckCircle } from "react-icons/fi";

const MessageBox = ({
  message,
  title,
  isExpanded,
  onToggle,
  onMarkAsDelete,
  onMarkAsSeen,
  id,
  isSeen,
  isDeleted,
}) => {
  const [localIsSeen, setLocalIsSeen] = useState(isSeen);
  const [localIsDeleted, setLocalIsDeleted] = useState(isDeleted);

  // Updated data function
  const updatedData = async (seen, deleted) => {
    try {
      await axios.post(
        "/api/update",
        { isSeen: seen, isDeleted: deleted, id },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Failed to update message:", error);
    }
  };

  const handleMarkAsSeen = async (e) => {
    e.stopPropagation();
    const updatedSeen = true;
    setLocalIsSeen(updatedSeen);
    onMarkAsSeen(id);
    await updatedData(updatedSeen, localIsDeleted);
  };

  const handleMarkAsDelete = async (e) => {
    e.stopPropagation();
    const updatedDeleted = true;
    setLocalIsDeleted(updatedDeleted);
    onMarkAsDelete(id);
    await updatedData(localIsSeen, updatedDeleted);
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
          {isExpanded && (
            <button
              className="text-red-500 hover:text-red-700 transition duration-200"
              onClick={handleMarkAsDelete}
            >
              <FiTrash2 size={20} />
            </button>
          )}

          <button
            className={`${
              localIsSeen ? "text-green-500" : "text-gray-500"
            } hover:text-green-700 transition duration-200`}
            onClick={handleMarkAsSeen}
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
  const { reload } = useAuth();
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  const fetchMessages = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/getdata");
      setMessagesData(data.data.reverse());
      console.log("getapi: ", data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages, reload]);

  const handleToggleExpansion = (id) => {
    setExpandedMessageId((prevId) => (prevId === id ? null : id));
  };

  const handleMarkAsDelete = (id) => {
    // Optionally remove from UI or re-fetch messages
    setMessagesData((prev) => prev.filter((msg) => msg._id !== id));
  };

  const handleMarkAsSeen = (id) => {
    // Optionally update in UI or re-fetch messages
    setMessagesData((prev) =>
      prev.map((msg) => (msg._id === id ? { ...msg, isSeen: true } : msg))
    );
  };

  return (
    <div className="p-6">
      {messagesData
        .filter((msg) => !msg.isDeleted)
        .map((message) => (
          <MessageBox
            key={message._id}
            title={message.name}
            message={message.message}
            isExpanded={expandedMessageId === message._id}
            onToggle={() => handleToggleExpansion(message._id)}
            onMarkAsDelete={handleMarkAsDelete}
            onMarkAsSeen={handleMarkAsSeen}
            id={message._id}
            isSeen={message.isSeen}
            isDeleted={message.isDeleted}
          />
        ))}
    </div>
  );
};

export default Messages;
