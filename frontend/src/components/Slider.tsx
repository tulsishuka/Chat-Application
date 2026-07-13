import { useEffect, useState } from "react";
import {
  MessageSquare,
  Users,
  Phone,
  Settings,
  MoreVertical,
} from "lucide-react";

import API from "../api/axios";
import socket from "../socket/socket";

interface User {
  _id: string;
  username: string;
  online: boolean;
}

interface SliderProps {
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
}

const Slider = ({
  selectedUser,
  setSelectedUser,
}: SliderProps) => {
  const [users, setUsers] = useState<User[]>([]);

  const currentUser = localStorage.getItem("username") || "";

  const menuItems = [
    {
      name: "Chats",
      icon: MessageSquare,
      active: true,
    },
    {
      name: "Contacts",
      icon: Users,
      active: false,
    },
    {
      name: "Calls",
      icon: Phone,
      active: false,
    },
    {
      name: "Settings",
      icon: Settings,
      active: false,
    },
  ];

  const loadUsers = async () => {
    try {
      const res = await API.get(`/auth/users?username=${currentUser}`);

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Listen for realtime user updates
  useEffect(() => {
    socket.on("usersUpdated", (updatedUsers: User[]) => {
      const filtered = updatedUsers.filter(
        (u) => u.username !== currentUser
      );

      setUsers(filtered);
    });

    return () => {
      socket.off("usersUpdated");
    };
  }, []);

  return (
    <div className="w-72 bg-[#0f172a] border-r border-slate-800 flex flex-col">

      <div className="p-5">

        <h1 className="text-white text-2xl font-bold mb-6">
          Realtime Chat
        </h1>

        <nav className="space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition

                ${
                  item.active
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800"
                }`}
              >
                <Icon size={18} />

                {item.name}
              </button>
            );
          })}
        </nav>

      </div>

      <div className="border-t border-slate-700"></div>

      <div className="flex-1 overflow-y-auto p-4">

        <h3 className="text-xs uppercase text-slate-500 mb-4">
          Users
        </h3>

        <div className="space-y-2">

          {users.map((user) => (

            <button
              key={user._id}
              onClick={() =>
                setSelectedUser(user.username)
              }
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition

              ${
                selectedUser === user.username
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >

              <div className="relative">

                <div className="w-11 h-11 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold">

                  {user.username.charAt(0).toUpperCase()}

                </div>

                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0f172a]

                  ${
                    user.online
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                />

              </div>

              <div className="text-left">

                <p className="text-white font-medium">

                  {user.username}

                </p>

                <p
                  className={`text-xs

                  ${
                    user.online
                      ? "text-green-400"
                      : "text-slate-500"
                  }`}
                >
                  {user.online
                    ? "Online"
                    : "Offline"}
                </p>

              </div>

            </button>

          ))}

        </div>

      </div>

      <div className="border-t border-slate-800 p-4 flex justify-between items-center">

        <div>

          <p className="text-white font-medium">
            {currentUser}
          </p>

          <p className="text-green-400 text-xs">
            Online
          </p>

        </div>

        <MoreVertical
          size={18}
          className="text-slate-400"
        />

      </div>

    </div>
  );
};

export default Slider;