import React from "react";
import { IoMdSend } from "react-icons/io";
import Test from "./Test";

const ChatBox = ({ currentLobby, joinChannel, messagesObj, socket }) => {
  return (
    <Test
      currentLobby={currentLobby}
      joinChannel={joinChannel}
      messagesObj={messagesObj}
      socket={socket}
    ></Test>
    // <div className="lobbyDiv">
    //   <div className="lobbyMsg"></div>

    //   <div className="inputContainer">
    //     <input
    //       type="text"
    //       placeholder="Type..."
    //       className="textInput"
    //     />
    //     <IoMdSend className="sendIcon" />
    //   </div>
    // </div>
  );
};

export default ChatBox;
