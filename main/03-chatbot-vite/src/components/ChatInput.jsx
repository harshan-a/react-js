import { useState } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";

import loadingSpinner from "../assets/loading-spinner.gif"
import "./ChatInput.css";

function ChatInput (props) {
  const [ inputText, setInputText ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const { 
    chatMessages, 
    setChatMessages,
    containerPosition,
    inputRef
  } = props;

  async function handleSendMessage() {
    if(!isLoading && inputText.trim()) {

      const newChatMessages = [...chatMessages, {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }]
      setChatMessages(newChatMessages);
      setInputText("");
      
      setIsLoading(true);
      setChatMessages([...newChatMessages, {
        message: <img src={loadingSpinner} width="40" style={{margin: "-15px"}} />,
        sender: "robot",
        id: crypto.randomUUID()
      }]);

      const response = await Chatbot.getResponseAsync(inputText);
      setChatMessages([...newChatMessages, {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }])
      setIsLoading(false);
    }
  }
  function handleClearMessages () {
    !isLoading && setChatMessages([]);
  }

  function handleInputChange (event) {
    const value = event.target.value;
    setInputText(value);
  }

  function handleKeyDown (e) {
    const { key } = e;
    if(key === "Enter") {
      handleSendMessage();
    }
    if(key === "Escape") setInputText("");
  }

  return (
    <div
      className={"chat-input-container " + containerPosition}
    >
      <input 
        type="text"
        placeholder="Send a message to Chatbot" 
        size="25" 
        onInput={handleInputChange}
        onKeyDown={handleKeyDown}
        value={inputText}
        ref={inputRef}
      />
      <button
        onClick={handleSendMessage}
      >Send</button>
      <button
        className="clear-btn"
        onClick={handleClearMessages}
      >Clear</button>
    </div>
  );
}

export default ChatInput;