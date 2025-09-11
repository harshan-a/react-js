import type { JSX } from "react";
import dayjs from "dayjs";

import robotImage from "../assets/robot.png";
import userImage from "../assets/user.png";
// import userImage from "../assets/profile-1.jpg";

import "./ChatMessage.css";

type ChatMessageProps = {
  message: string | JSX.Element
  sender: string
  time: number | undefined
}

function ChatMessage (props: ChatMessageProps) {
  const { message, sender, time } = props;

  return (
    <div
      className={"chat-message-" + sender}
    >
      {sender === "robot" && (
        <img src={robotImage} width="45" />
      )}
      <span
        className="chat-message-text"
      >{message}<p>{time && dayjs(time).format("h:mma")}</p></span>
      {sender === "user" && (
        <img src={userImage} width="45" />
      )}
    </div>
  );
}

export default ChatMessage;