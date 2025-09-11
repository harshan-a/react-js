import { useState, useEffect, useRef } from 'react'
import { Chatbot } from "supersimpledev";

import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import PositionSwitcher from "./components/PositionSwitcher";

import type { ChatMessagesType } from "./utils/types"

import profileImage from "./assets/profile-1.jpg"

import './App.css'


function App () {
  const position = localStorage.getItem("position") as "top" | "bottom" || "bottom";
  const localChatMessages = localStorage.getItem("chatMessages")
  const savedChatMessages: ChatMessagesType | [] = localChatMessages ? JSON.parse(localChatMessages) : [];

  const [ textboxPosition, setTextboxPosition ] = useState(position)

  const [ chatMessages, setChatMessages ] = useState(savedChatMessages)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    Chatbot.addResponses({
      "yourName": "Everyone called me chatbot..."
    });
    window.addEventListener("keydown", handleKeyDown)
  }, []);
  
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  function handleKeyDown (event: KeyboardEvent) {
    const { key } = event;
    if(key === "/") {
      inputRef.current?.focus();
    }
  }

  return (
    <>
      
      <link rel="icon" type="image/png+xml" href={profileImage} />

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
    </>
  );
}

export default App
