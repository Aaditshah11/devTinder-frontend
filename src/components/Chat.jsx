import { useParams } from "react-router-dom";
import { useState } from "react";

function Chat() {
  const targetUserId = useParams();
  const [messages, setMessages] = useState(["hello", "hi"]);
  console.log(targetUserId);

  return (
    <div className="w-full max-w-2xl mx-auto border border-base-300 bg-base-100 p-4 rounded-xl shadow-lg mt-8 flex flex-col h-[70vh]">
      <div className="border-b border-base-300 pb-4 mb-4">
        <h2 className="text-xl font-semibold text-center text-base-content">Chat</h2>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50 ml-1">12:45</time>
          </div>
          <div className="chat-bubble chat-bubble-primary">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>

        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50 ml-1">12:46</time>
          </div>
          <div className="chat-bubble">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </div>

      {/* Message input area */}
      <div className="flex gap-2 pt-4 border-t border-base-300 mt-4 px-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1"
        />
        <button className="btn btn-primary px-6">Send</button>
      </div>
    </div>
  );
}

export default Chat;
