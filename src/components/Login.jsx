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
    }).then((res) => ( res.json() )).then((data) => ( console.log(data) ));

    if (email.trim() && password.trim()) {
      localStorage.setItem("email", email);
      navigate("/app");
    }
  };

  return (
    <div className="loginContainer">
      <h1>
        <img className="logo" src="../becord-logo.png" alt="logo" />
        BeCord
      </h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Login;
