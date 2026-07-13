import { Request, Response } from "express";
import Message from "../models/Message";

export const getMessages = async (
  req: Request,
  res: Response
) => {

  const { user1, user2 } = req.params;

  const messages = await Message.find({

    $or: [

      {
        sender: user1,
        receiver: user2,
      },

      {
        sender: user2,
        receiver: user1,
      },

    ],

  }).sort({
    createdAt: 1,
  });

  res.json(messages);

};