import { useState } from "react";
import ServerList from "./ServerList";
import UserList from "./UserList";
import ChatBox from "./ChatBox";
import Toggles from "./Toggles";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";



const Home = () => {
  const [showLists, setShowLists] = useState(true);
  const [currentLobby, setCurrentLobby] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket] = useState(() => io("http://localhost:3000", { transports: ["websocket"] }));

  const toggleLists = () => {
    setShowLists((prev) => !prev);
  };

  const joinChannel = async (channel) => {
    socket.emit("join_channel", channel); // Envoie l'ID du lobby au serveur

    setCurrentLobby(channel);

    try {
      const response = await fetch(
        `http://localhost:3000/lobbyMessages/${channel._id}`,
        {
          method: "GET",
          credentials: "include", // Important pour envoyer le cookie JWT
        }
      );
      

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des messages");
      }

      const data = await response.json();

      console.log(data.messages);

      setMessages(data.messages || []); // Mets à jour les messages avec ceux de la DB

      toast(`Vous avez rejoint le channel ${channel._id}`);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages:", error);
      toast("Erreur lors de la récupération des messages");
    }
  };

  return (
    <div className="app">
      <Toggles showLists={showLists} toggleLists={toggleLists} />
      <div className="display">
        {showLists && <ServerList joinChannel={joinChannel} />}
        <ChatBox socket={socket} currentLobby={currentLobby} joinChannel={joinChannel} messagesObj={{setMessages:setMessages, messages:messages}} />
        {showLists && <UserList />}
      </div>
    </div>
  );
};

export default Home;
