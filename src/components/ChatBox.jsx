import React from "react";
import { IoMdSend } from "react-icons/io";

const ChatBox = () => {
  return (
    <div className="lobbyDiv">
      <div className="lobbyMsg"></div>
      
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Type..."
          className="textInput"
        />
        <IoMdSend className="sendIcon" />
      </div>
    </div>
  );
};

export default ChatBox;
