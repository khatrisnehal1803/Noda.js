import { useEffect, useState } from "react";
import api from "../api/axios";

const Home = () => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/home")
      .then(res => setMsg(res.data.message))
      .catch(() => setMsg("Unauthorized"));
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <h2>Home</h2>
      <p>{msg}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
