import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

export default function ChatApp() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [currentChannel, setCurrentChannel] = useState(null);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/lobbies")
      .then((result) => result.json())
      .then((data) => {
        setChannels(data);
      });

    socket.on("receive_message_from_channel", (data) => {
      console.log(data);

      setMessages((prev) => [...prev, data]);

      toast(`${data.user.email}: ${data.message}`);
    });

    return () => {
      socket.off("receive_message_from_channel");
      socket.off("connection");
    };
  }, []);

  const createChannel = async () => {
    if (!channelName.trim()) {
      toast("Le nom du channel est invalide");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/createLobby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies (JWT token) are sent
        body: JSON.stringify({ name: channelName }), // Send the channel name
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du channel");
      }

      const newLobby = await response.json();

      // Store the new lobby's ID in state
      setChannels((prev) => [...prev, newLobby]);

      toast(`Channel créé avec succès: ${newLobby.name}`);
    } catch (error) {
      console.error("Erreur lors de la création du channel:", error);
      toast("Erreur lors de la création du channel");
    }
  };

  const joinChannel = async (channel) => {
    socket.emit("join_channel", channel); // Envoie l'ID du lobby au serveur

    setCurrentChannel(channel);

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

  const sendMessage = () => {
    if (message.trim() && currentChannel) {
      socket.emit("send_message_to_channel", {
        sender: "Me",
        text: message,
        channel: currentChannel,
      });
      setMessage("");
    }
  };

  return (
    <div className="p-4 w-full max-w-lg mx-auto">
      <div className="mb-4">
        <input
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Nom du channel..."
        />
        <button onClick={createChannel}>Créer un Channel</button>
      </div>

      <div className="mb-4">
        <h3>Liste des Channels</h3>
        <ul>
          {channels.map((channel, index) => (
            <li key={index}>
              <button onClick={() => joinChannel(channel)}>
                {channel.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {currentChannel && (
        <div>
          <h3>Messages dans le channel {currentChannel.name}</h3>
          <Card>
            <CardContent className="p-4">
              <div className="mb-4 max-h-60 overflow-y-auto border p-2 rounded">
                {messages.map((msg, index) => (
                  <p key={index}>
                    <strong>{msg.user.email}:</strong> {msg.message}
                  </p>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message..."
                />
                <button onClick={sendMessage}>Envoyer</button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

// function Input({ value, onChange, placeholder }) {
//   return (
//     <input
//       className="border rounded p-2 w-full"
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//     />
//   );
// }

function Card({ children }) {
  return <div className="bg-white shadow-md p-4 rounded-lg">{children}</div>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}

// function Button({ children, onClick }) {
//   return (
//     <button className="bg-blue-500 text-white p-2 rounded" onClick={onClick}>
//       {children}
//     </button>
//   );
// }
