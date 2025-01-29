import { useState } from "react";
import ServerList from "./ServerList";
import UserList from "./UserList";
import ChatBox from "./ChatBox";
import Toggles from "./Toggles";

const Home = () => {
  const [showLists, setShowLists] = useState(true);

  const toggleLists = () => {
    setShowLists((prev) => !prev);
  };

  return (
    <div className="app">
      <Toggles showLists={showLists} toggleLists={toggleLists} />
      <div className="display">
        {showLists && <ServerList />}
        <ChatBox />
        {showLists && <UserList />}
      </div>
    </div>
  );
};

export default Home;
