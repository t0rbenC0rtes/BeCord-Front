import React from "react";
import "./styles/main.scss";
import ServerList from "./components/ServerList";
import UserList from "./components/UserList";
import ChatBox from "./components/ChatBox";

const App = () => {
  return (
    <div className="app">
      <h1>
        <img className="logo" src="../public/becord-logo.png" alt="" />
        BeCord
      </h1>
      <div className="display">
        <ServerList />
        <ChatBox />
        <UserList />
      </div>
    </div>
  );
};

export default App;
