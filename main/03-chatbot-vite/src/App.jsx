import { useState, useEffect, useRef } from 'react'
import { Chatbot } from "supersimpledev";

import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import PositionSwitcher from "./components/PositionSwitcher";

import './App.css'

function App () {
  const position = localStorage.getItem("position") || "bottom";
  const savedChatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];

  const [ textboxPosition, setTextboxPosition ] = useState(position);
  const [ chatMessages, setChatMessages ] = useState(savedChatMessages);
  const inputRef = useRef(null);

  useEffect(() => {
    Chatbot.addResponses({
      "yourName": "Everyone called me chatbot..."
    });
    window.addEventListener("keydown", handleKeyDown)
  }, []);
  
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  function handleKeyDown (event) {
    const { key } = event;
    if(key === "/") {
      const inputElem = inputRef.current;
      inputElem.focus();
    }
  }

  return (
    <div
      className="chat-bot-container"
    >
    {
      textboxPosition === "top" ? (
        <>
          <ChatInput 
            containerPosition="top"
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            inputRef={inputRef}
            />
          <ChatMessages 
            containerPosition="bottom"
            chatMessages={chatMessages}
            />
        </>
      ) : (
        <>
          <ChatMessages 
            containerPosition="top"
            chatMessages={chatMessages}
            />
          <ChatInput 
            containerPosition="bottom"
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            inputRef={inputRef}
          />
        </>
      )
      
    }
    <PositionSwitcher 
      textboxPosition={textboxPosition}
      setTextboxPosition={setTextboxPosition}
    />
    </div>
  );
}

export default App
