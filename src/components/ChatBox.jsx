import React from "react";

const ChatBox = () => {
  return (
    <>
      <div className="lobbyDiv">
        <div className="lobbyMsg"></div>
        <input
          type="text"
          placeholder="Type your message..."
          className="textInput"
        />
      </div>
    </>
  );
};

export default ChatBox;
