import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, MessageSquare } from "lucide-react";

import API from "../api/axios";
import socket from "../socket/socket";

const Login = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim()) {
      alert("Enter username");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        username: username.trim(),
      });

      const user = res.data.user;

      localStorage.setItem("username", user.username);

      if (!socket.connected) {
        socket.connect();
      }


      socket.emit("login", user.username);

      navigate("/home");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-slate-800 w-[420px] rounded-xl p-8 shadow-lg">

        <div className="flex justify-center mb-6">

          <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center">
            <MessageSquare className="text-white" size={30} />
          </div>

        </div>

        <h1 className="text-3xl text-white font-bold text-center">
          Realtime Chat
        </h1>

        <p className="text-slate-400 text-center mt-2 mb-8">
          Enter a username to continue
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none mb-5"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-semibold flex justify-center items-center gap-2"
          >
            {loading ? "Joining..." : "Join Chat"}

            <LogIn size={18} />
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;
