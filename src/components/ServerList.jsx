import React from "react";
import { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { HiMiniServer } from "react-icons/hi2";

const ServerList = () => {
  const [lobbies, setLobbies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/lobbies").then((result) => (result.json())).then((data) => {
      setLobbies(data)
    })
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
            <li key={lobby._id}>
              <HiMiniServer className="serverBtn" />
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