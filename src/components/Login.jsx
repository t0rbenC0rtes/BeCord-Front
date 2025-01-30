import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:3000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data),
          navigate("/app");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Erreur lors de la connexion", error));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log(data),
        alert("You have been registered successfully, you can now login if you want to."),
        navigate("/app");
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.error("Erreur lors de l'inscription", error));
  };

  return (
    <div className="loginContainer">
      <h1>
        <img className="logo" src="../becord-logo.png" alt="logo" />
        BeCord
      </h1>
      <form>
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleLogin}>Login</button>
        <button type="submit" onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
};

export default Login;
