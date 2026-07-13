import { useState } from "react";

import Slider from "../components/Slider";
import ChatMessage from "../components/ChatMessage";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">

      <Slider
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <ChatMessage
        selectedUser={selectedUser}
      />

    </div>
  );
};

export default Home;