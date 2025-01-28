import React from "react";

const ChatBox = () => {
  return (
    <div className="lobbyDiv">
      <div className="lobbyMsg"></div>
      <div className="textInputDiv">
        <input
          type="text"
          placeholder="Type your message..."
          className="textInput"
        />
      </div>
    </div>
  );
};

export default ChatBox;
