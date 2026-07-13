import { Server, Socket } from "socket.io";
import User from "./models/User";
import Message from "./models/Message";


export const socketHandler = (io: Server) => {

  io.on("connection", (socket: Socket) => {

    console.log("Connected:", socket.id);

    socket.on("login", async (username: string) => {

      await User.findOneAndUpdate(
        { username },
        {
          online: true,
          socketId: socket.id,
        }
      );

      const users = await User.find();

      io.emit("usersUpdated", users);

      console.log(username, "online");
    });

    socket.on("sendMessage", async (data) => {

      const { sender, receiver, text } = data;

      const receiverUser = await User.findOne({
        username: receiver,
      });

      const message = await Message.create({
        sender,
        receiver,
        text,
        status: receiverUser?.online ? "delivered" : "sent",
      });

      io.to(socket.id).emit("messageSent", message);

      if (receiverUser?.socketId) {
        io.to(receiverUser.socketId).emit(
          "receiveMessage",
          message
        );
      }
    });

    socket.on("typing", async (data) => {

      const receiver = await User.findOne({
        username: data.receiver,
      });

      if (receiver?.socketId) {
        io.to(receiver.socketId).emit(
          "typing",
          {
            sender: data.sender,
          }
        );
      }
    });

    socket.on("readMessage", async (id) => {

      const msg = await Message.findByIdAndUpdate(
        id,
        {
          status: "read",
        },
        {
          new: true,
        }
      );

      if (!msg) return;

      const sender = await User.findOne({
        username: msg.sender,
      });

      if (sender?.socketId) {
        io.to(sender.socketId).emit(
          "messageRead",
          msg
        );
      }
    });

    socket.on("disconnect", async () => {

      const user = await User.findOneAndUpdate(
        {
          socketId: socket.id,
        },
        {
          online: false,
          socketId: null,
        },
        {
          new: true,
        }
      );

      const users = await User.find();

      io.emit("usersUpdated", users);

      console.log(user?.username, "offline");
    });

  });

};