import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";

import "./ChatMessages.css";

function useAutoScroll (dependencies) {
  const containerRef = useRef(null);
  useEffect(() => {
    const containerElem = containerRef.current;
    containerElem && (
      containerElem.scrollTop = containerElem.scrollHeight
    )
  }, [dependencies]);
  
  return containerRef;
}

function ChatMessages (props) {
  const { chatMessages, containerPosition } = props;

  const chatContainerRef = useAutoScroll(chatMessages);
  
  return (
    <div
      className={"chat-message-container " + containerPosition}
      ref={chatContainerRef}
    >
      {
        (chatMessages.length <= 0) ? (
          <span
            className="chat-welcome-message"
          >
            Welcome to the chatbot project! Send a message using the textbox 
            {containerPosition === "bottom" ? "above" : "below"}.
          </span>
          ) : (
            chatMessages.map(chatMessage => 
              <ChatMessage
                message={chatMessage.message}
                time={chatMessage.time}
                sender={chatMessage.sender}
                key={chatMessage.id}
              />
            )
          )
      }
    </div>
  );
}

export default ChatMessages;