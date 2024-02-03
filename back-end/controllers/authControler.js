import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { hashedPassword, comparePasswords } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "ADMIN" : req.body.role;
  const hashePassword = await hashedPassword(req.body.password);
  req.body.password = hashePassword;

  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "user Created" });
};
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValidUser =
    user && (await comparePasswords(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  
  if (user.role === "ORGANIZER" && !user.approved) {
    throw new UnauthenticatedError("Organizer not approved");
  }

  const token = createJWT({ userId: user._id, role: user.role });

  const { name, lastName, role, email, companyName, _id, balance, approved } =
    user;
  if (role === "ORGANIZER") {
    res
      .status(StatusCodes.OK)
      .json({ name, companyName, role, email, token, _id, approved });
    console.log(name, companyName, role, email, token);
  } else {
    res
      .status(StatusCodes.OK)
      .json({ name, lastName, role, email, token, _id, balance });
  }
};
export const logout = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "userLogedout" });
};
