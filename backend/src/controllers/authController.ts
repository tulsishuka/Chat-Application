import { Request, Response } from "express";
import User from "../models/User";

export const login = async (
  req: Request,
  res: Response
) => {

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({
      message: "Username required",
    });
  }

  let user = await User.findOne({
    username,
  });

  if (!user) {
    user = await User.create({
      username,
    });
  }

  res.json({
    user,
  });

};

export const getUsers = async (
  req: Request,
  res: Response
) => {

  const username = req.query.username;

  const users = await User.find({
    username: {
      $ne: username,
    },
  });

  res.json(users);

};