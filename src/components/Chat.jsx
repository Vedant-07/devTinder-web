import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import api from "../utils/api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Chat = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user?.value);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!currentUser) return;

    // Connect to socket with auth token
    const token = localStorage.getItem("token");
    const newSocket = io(BASE_URL, {
      auth: { token }
    });
    setSocket(newSocket);

    newSocket.emit("join", currentUser._id);

    newSocket.on("receiveMessage", (msg) => {
      if (msg.senderId === userId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    newSocket.on("messageSent", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    const fetchChatHistory = async () => {
      try {
        const res = await api.get(`/chat/${userId}`);
        setMessages(res.data.messages);
      } catch (err) {
        // Handle error silently
      }
    };

    fetchChatHistory();

    return () => {
      newSocket.disconnect();
    };
  }, [currentUser, userId]);

  const handleSend = () => {
    if (!newMessage.trim() || !socket) return;

    socket.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId: userId,
      message: newMessage.trim(),
    });

    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex justify-center p-2">
      <div className="flex flex-col h-[calc(100vh-5rem)] w-[95%] bg-base-100 rounded-lg shadow-xl border border-base-300">
        {/* Header */}
        <div className="bg-base-200 p-4 flex items-center gap-3 border-b border-base-300 rounded-t-lg">
          <button onClick={() => navigate("/connection")} className="btn btn-ghost btn-sm">
            ← Back
          </button>
          <span className="font-semibold">Chat</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No messages yet. Say hi! 👋
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${
                  msg.senderId === currentUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble ${
                    msg.senderId === currentUser._id
                      ? "chat-bubble-primary"
                      : "chat-bubble-secondary"
                  }`}
                >
                  {msg.message}
                </div>
                <div className="chat-footer text-xs opacity-50 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-base-200 border-t border-base-300 rounded-b-lg">
          <div className="flex gap-2">
            <input
              type="text"
              className="input input-bordered flex-1"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="btn btn-primary"
              onClick={handleSend}
              disabled={!newMessage.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
