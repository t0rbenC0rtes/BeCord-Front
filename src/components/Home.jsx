import ServerList from "./ServerList";
import UserList from "./UserList";
import ChatBox from "./ChatBox";

const Home = () => {
  return (
    <div className="app">      
      <div className="display">
        <ServerList />
        <ChatBox />
        <UserList />
      </div>
    </div>
  );
};

export default Home;
