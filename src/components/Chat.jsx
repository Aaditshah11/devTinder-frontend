import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { createSocketConnection } from "../utils/socket";

function Chat() {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSetNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    if (!user) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId: user._id,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, message, userId }) => {
      console.log(firstName + ": " + message);
      setMessages((prev) => [...prev, { firstName, message, userId }]);
    });

    return () => {
      socket.emit("disconnectChat", { userId: user._id, targetUserId });
    };
  }, [targetUserId, user]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId: user._id,
      targetUserId,
      message: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto border border-base-300 bg-base-100 p-4 rounded-xl shadow-lg mt-8 flex flex-col h-[70vh]">
      <div className="border-b border-base-300 pb-4 mb-4">
        <h2 className="text-xl font-semibold text-center text-base-content">
          Chat
        </h2>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            className={`chat ${msg.userId === user._id ? "chat-end" : "chat-start"}`}
            key={index}
          >
            {/* <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                />
              </div>
            </div> */}
            <div className="chat-header">
              {msg.firstName}
              <time className="text-xs opacity-50 ml-1">12:45</time>
            </div>
            <div
              className={`chat-bubble ${
                msg.userId === user._id ? "chat-bubble-primary" : ""
              }`}
            >
              {msg.message}
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        ))}
      </div>

      {/* Message input area */}
      <div className="flex gap-2 pt-4 border-t border-base-300 mt-4 px-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1"
          value={newMessage}
          onChange={handleSetNewMessage}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button className="btn btn-primary px-6" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
