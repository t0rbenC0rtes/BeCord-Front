import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function ChatApp({currentLobby, joinChannel, messagesObj, socket}) {
  const [message, setMessage] = useState("");
  const [channelName, setChannelName] = useState("");
  // const [channels, setChannels] = useState([]);
  const {messages, setMessages} = messagesObj;

  
  useEffect(() => {
    if(!currentLobby){return;}

    
    socket.on("connect", () => {
      console.log("Socket connected successfully!");
    });

    joinChannel(currentLobby)

    socket.on("receive_message_from_channel", (data) => {
      console.log(data);

      setMessages((prev) => [...prev, data]);

      toast(`${data.user.email}: ${data.message}`);
    });

    return () => {
      socket.off("receive_message_from_channel");
      socket.off("connection");
    };
  }, [currentLobby]);

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
      // setChannels((prev) => [...prev, newLobby]);

      toast(`Channel créé avec succès: ${newLobby.name}`);
    } catch (error) {
      console.error("Erreur lors de la création du channel:", error);
      toast("Erreur lors de la création du channel");
    }
  };


  const sendMessage = () => {
    if (message.trim() && currentLobby) {
      socket.emit("send_message_to_channel", {
        sender: "Me",
        text: message,
        channel: currentLobby,
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
          {/* {
          channels.map((channel, index) => (
            <li key={index}>
              <button onClick={() => joinChannel(channel)}>
                {channel.name}
              </button>
            </li>
          ))} */}
        </ul>
      </div>

      {currentLobby && (
        <div>
          <h3>Messages dans le channel {currentLobby.name}</h3>
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
