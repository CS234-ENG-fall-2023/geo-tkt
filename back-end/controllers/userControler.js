import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Event from "../models/eventModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.status(StatusCodes.OK).json({ users });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Event.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.status(StatusCodes.OK).json({ msg: "updateUser" });
};

export const findUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(StatusCodes.OK).json({ user });
};
