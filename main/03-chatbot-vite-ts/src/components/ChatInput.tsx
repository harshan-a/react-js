import { 
  useState, 
  useRef, 
  type RefObject,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";

import type { ChatMessagesType } from '../utils/types'
import loadingSpinner from "../assets/loading-spinner.gif"
import "./ChatInput.css";


type ChatInputProps = {
  chatMessages: ChatMessagesType
  setChatMessages: (chatMessages: ChatMessagesType) => void
  containerPosition: string
  inputRef: RefObject<HTMLInputElement | null>
}

function ChatInput(props: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    chatMessages,
    setChatMessages,
    containerPosition,
    inputRef
  } = props;
  const count = useRef(chatMessages.length)

  async function handleSendMessage() {
    if (!isLoading && inputText.trim()) {

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
        message: <img src={loadingSpinner} width="40" style={{ margin: "-15px" }} />,
        sender: "robot",
        id: crypto.randomUUID()
      }]);
      
      count.current = newChatMessages.length
      const response = await Chatbot.getResponseAsync(inputText);
      setChatMessages([...newChatMessages, {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }])
      setIsLoading(false);
      count.current = newChatMessages.length + 1
    }
  }
  function handleClearMessages() {
    !isLoading && setChatMessages([]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputText(value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const { key } = e;
    if (key === "Enter") {
      handleSendMessage();
    }
    if (key === "Escape") setInputText("");
  }

  return (
    <>
      <title>
        {chatMessages.length > 0
        ? `${count.current} Messages`
        : "Chatbot Project"}
      </title>
      <div
        className={"chat-input-container " + containerPosition}
      >
        <input
          type="text"
          placeholder="Send a message to Chatbot"
          size={25}
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
    </>
  );
}

export default ChatInput;