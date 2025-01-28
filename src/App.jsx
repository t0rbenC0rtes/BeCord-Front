import React from "react";
import "./styles/main.scss";
import ServerList from "./components/ServerList";
import UserList from "./components/UserList";

const App = () => {
  return (
    <div className="app">
      <h1>BeCord</h1>
      <div className="display">
        <ServerList />
        <UserList />
      </div>
    </div>
  );
};

export default App;
