import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io(["http://localhost:3000", "http://localhost:5173"]);

export default function ChatApp() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [currentChannel, setCurrentChannel] = useState(null);
  const [channels, setChannels] = useState([]);

  // Liste des channels existants (exemple basique)
  const [createdChannels, setCreatedChannels] = useState([]);

  useEffect(() => {
    socket.on("receive_message_from_channel", (data) => {
      console.log("testsetsetset");

      setMessages((prev) => [...prev, data]);
      toast(`${data.sender}: ${data.text}`);
    });

    return () => {
      socket.off("receive_message_from_channel");
    };
  }, []);

  const createChannel = () => {
    if (channelName.trim() && !createdChannels.includes(channelName)) {
      setCreatedChannels((prev) => [...prev, channelName]);
      toast(`Channel ${channelName} créé avec succès`);
    } else {
      toast(`Le nom du channel est déjà utilisé ou invalide`);
    }
  };

  const joinChannel = (channel) => {
    socket.emit("join_channel", channel);
    setCurrentChannel(channel);
    setMessages([]); // Vider les anciens messages lors du changement de channel
    toast(`Vous avez rejoint le channel ${channel}`);
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
        <Input
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Nom du channel..."
        />
        <Button onClick={createChannel}>Créer un Channel</Button>
      </div>

      <div className="mb-4">
        <h3>Liste des Channels</h3>
        <ul>
          {createdChannels.map((channel, index) => (
            <li key={index}>
              <Button onClick={() => joinChannel(channel)}>{channel}</Button>
            </li>
          ))}
        </ul>
      </div>

      {currentChannel && (
        <div>
          <h3>Messages dans le channel {currentChannel}</h3>
          <Card>
            <CardContent className="p-4">
              <div className="mb-4 max-h-60 overflow-y-auto border p-2 rounded">
                {messages.map((msg, index) => (
                  <p key={index}>
                    <strong>{msg.sender}:</strong> {msg.text}
                  </p>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message..."
                />
                <Button onClick={sendMessage}>Envoyer</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

function Input({ value, onChange, placeholder }) {
  return (
    <input
      className="border rounded p-2 w-full"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

function Card({ children }) {
  return <div className="bg-white shadow-md p-4 rounded-lg">{children}</div>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}

function Button({ children, onClick }) {
  return (
    <button className="bg-blue-500 text-white p-2 rounded" onClick={onClick}>
      {children}
    </button>
  );
}
