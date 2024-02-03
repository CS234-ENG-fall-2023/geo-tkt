import {
  UnathorizedError,
  UnauthenticatedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJTW } from "../utils/tokenUtils.js";
export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    throw new UnauthenticatedError("No authorization header");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new UnauthenticatedError("No token in authorization header");
  }

  const { userId, role } = verifyJTW(token);
  req.user = { userId, role };
  req.role = role;

  next();
};

export const authorizedPermisions = (...roles) => {
  return (req, res, next) => {
    console.log(req.role);
    if (!roles.includes(req.user.role)) {
      throw new UnathorizedError("unathroized to acces this route");
    }

    next();
  };
};
