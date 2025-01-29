import { useState } from "react";
import ServerList from "./ServerList";
import UserList from "./UserList";
import ChatBox from "./ChatBox";
import Toggles from "./Toggles";

const Home = () => {
  const [showUserList, setShowUserList] = useState(false); // Default to 'ON'

  const toggleUserList = () => {
    setShowUserList((prev) => !prev);
  };

  return (
    <div className="app">
      <Toggles showUserList={showUserList} toggleUserList={toggleUserList} />
      <div className="display">
        <ServerList />
        <ChatBox />
        {showUserList && <UserList />}
      </div>
    </div>
  );
};

export default Home;
