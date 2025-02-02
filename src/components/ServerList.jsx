import React from "react";
import { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { HiMiniServer } from "react-icons/hi2";

const ServerList = ({joinChannel}) => {
  const [lobbies, setLobbies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/lobbies", {
      method: "GET",
      credentials: "include", // Allows cookies to be sent with the request
  }).then((result) => (result.json())).then((data) => {
      setLobbies(data)
    }).catch((error) => {
      console.error("Error fetching lobbies:", error);
  });
  }, []);

  if (loading) {
    return <p>Loading lobbies...</p>;
  }

  return (
    <div className="serverList">
      <div className="serverDiv">
        <MdAdd className="addServerBtn" /><p>Add server</p>
      </div>
      {lobbies.length > 0 ? (
        <ul className="serverDiv">
          {lobbies.map((lobby) => (
            <li key={lobby._id} onClick={() => joinChannel(lobby)}>
              <HiMiniServer className="serverBtn" />
              <p>{lobby.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No lobbies available.</p>
      )}
    </div>
  );
};

export default ServerList;