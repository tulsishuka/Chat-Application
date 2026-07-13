import { useEffect, useRef, useState } from "react";
import {
  Send,
  Smile,
  Plus,
  AtSign,
} from "lucide-react";

import API from "../api/axios";
import socket from "../socket/socket";

interface Message {
  _id: string;
  sender: string;
  receiver: string;
  text: string;
  status: "sent" | "delivered" | "read";
  createdAt: string;
}


interface Props {
  selectedUser: string;
}

const ChatMessage = ({ selectedUser }: Props) => {
  const currentUser = localStorage.getItem("username") || "";

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  // Load previous messages
  useEffect(() => {
    if (!selectedUser) return;

    const load = async () => {
      try {
        const res = await API.get(
          `/messages/${currentUser}/${selectedUser}`
        );

        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, [selectedUser]);

  // Receive realtime message
  useEffect(() => {
    const receive = (message: Message) => {
      if (
        (message.sender === selectedUser &&
          message.receiver === currentUser) ||
        (message.sender === currentUser &&
          message.receiver === selectedUser)
      ) {
        setMessages((prev) => [...prev, message]);

        if (message.receiver === currentUser) {
          socket.emit("readMessage", message._id);
        }
      }
    };

    socket.on("receiveMessage", receive);

    return () => {
      socket.off("receiveMessage", receive);
    };
  }, [selectedUser]);

  // Sender confirmation
  useEffect(() => {
    socket.on("messageSent", (msg: Message) => {
      setMessages((prev) => {
        const exists = prev.find((m) => m._id === msg._id);

        if (exists) return prev;

        return [...prev, msg];
      });
    });

    return () => {
      socket.off("messageSent");
    };
  }, []);

  useEffect(() => {
  socket.on(
    "typing",
    (data: { sender: string }) => {
      if (data.sender === selectedUser) {
        setTyping(`${data.sender} is typing...`);

        setTimeout(() => {
          setTyping("");
        }, 1000);
      }
    }
  );

  return () => {
    socket.off("typing");
  };
}, [selectedUser]);

 
  useEffect(() => {
  socket.on(
    "typing",
    ({ sender }: { sender: string }) => {
      if (sender === selectedUser) {
        setTyping(`${sender} is typing...`);

        setTimeout(() => {
          setTyping("");
        }, 1000);
      }
    }
  );

  return () => {
    socket.off("typing");
  };
}, [selectedUser]);


  // Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;
    if (!selectedUser) return;

    socket.emit("sendMessage", {
      sender: currentUser,
      receiver: selectedUser,
      text,
    });

    setText("");
  };

  return (
    <div className="flex flex-col flex-1 bg-slate-900">

      {/* Header */}

      <div className="h-16 border-b border-slate-800 px-6 flex items-center">

        <div>

          <h2 className="text-white font-semibold text-lg">
            {selectedUser || "Select User"}
          </h2>

          <p className="text-xs text-slate-400">
            {typing || "Realtime Chat"}
          </p>

        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {!selectedUser && (
          <div className="h-full flex justify-center items-center text-slate-500 text-xl">
            Select a user to start chatting
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.sender === currentUser
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`rounded-xl px-4 py-3 max-w-sm ${
                msg.sender === currentUser
                  ? "bg-blue-600"
                  : "bg-slate-800"
              }`}
            >
              <p>{msg.text}</p>

              <div className="flex justify-between mt-2 text-xs">

                <span>
                  {new Date(
                    msg.createdAt
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                {msg.sender === currentUser && (
                  <span>
                    {msg.status === "sent" && "✓"}

                    {msg.status === "delivered" && "✓✓"}

                    {msg.status === "read" && (
                      <span className="text-cyan-300">
                        ✓✓
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        <div ref={bottomRef} />

      </div>

      {/* Input */}

      {selectedUser && (
        <div className="border-t border-slate-800 p-4">

          <div className="bg-slate-800 rounded-xl flex items-center px-4 py-3 gap-3">

            <Plus size={18} />

            <Smile size={18} />

            <input
              value={text}
              onChange={(e) => {
                setText(e.target.value);

                socket.emit("typing", {
                  sender: currentUser,
                  receiver: selectedUser,
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className="flex-1 bg-transparent outline-none text-white"
              placeholder={`Message ${selectedUser}`}
            />

            <AtSign size={18} />

            <button
              onClick={sendMessage}
              className="bg-blue-600 p-2 rounded-lg"
            >
              <Send size={18} />
            </button>

          </div>

        </div>
      )}
    </div>
  );
};

export default ChatMessage;