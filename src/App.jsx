import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Lobby from "./components/Lobby";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<Home />} />
      <Route path="/app/lobby/:id" element={<Lobby />} /> {/* Dynamic route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
