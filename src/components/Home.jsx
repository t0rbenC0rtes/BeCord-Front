import ServerList from "./ServerList";
import UserList from "./UserList";
import ChatBox from "./ChatBox";
import Toggles from "./Toggles";

const Home = () => {
  return (
    <div className="app">
      <Toggles />
      <div className="display">
        <ServerList />
        <ChatBox />
        <UserList />
      </div>
    </div>
  );
};

export default Home;
