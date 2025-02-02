import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Lobby = () => {
  const { id } = useParams(); // Get the lobby ID from the URL

  useEffect(() => {
    const joinLobby = async () => {
      try {
        const response = await fetch(`http://localhost:3000/joinLobby/${id}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error joining lobby:", error);
      }
    };

    joinLobby();
  }, [id]);

  return <h1>Lobby {id}</h1>;
};

export default Lobby;
