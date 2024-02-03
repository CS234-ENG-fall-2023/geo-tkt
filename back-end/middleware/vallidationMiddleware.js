import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnathorizedError,
} from "../errors/customErrors.js";
import { EVENT_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Event from "../models/eventModel.js";
import User from "../models/userModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        const errorMessages = error.array().map((error) => error.msg);
        const error1 = errorMessages[0];
        console.log(error1);
        if (errorMessages[0].startsWith("no job with ")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnathorizedError("not authorized to acces this route");
        }
        throw new BadRequestError(errorMessages);
      }

      next();
    },
  ];
};
export const validateEventInput = withValidationErrors([
  body("companyName").notEmpty().withMessage("company is required"),
  body("eventTitle").notEmpty().withMessage("Event title is required"),
  body("description")
    .notEmpty()
    .withMessage("Event description is required"),
  body("eventType")
    .isIn(Object.values(EVENT_TYPE))
    .withMessage("Invalid type value"),
  body("eventLocation").notEmpty().withMessage("Event location is required"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidID = mongoose.Types.ObjectId.isValid(value);
    if (!isValidID) throw new BadRequestError("invalid MongoDB id");
    const job = await Event.findById(value);
    if (!job) throw new NotFoundError(`no event with this id ${value}`);
    const isAdmin = req.user.role === "ADMIN";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnathorizedError("not authorized to acces this route");
  }),
]);

export const validateRegister = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("lastName").custom((value, { req }) => {
    if (req.body.role === "CUSTOMER" && !value) {
      throw new Error("lastName is required");
    }
    return true;
  }),
  body("companyName").custom((value, { req }) => {
    if (req.body.role === "ORGANIZER" && !value) {
      throw new Error("companyName is required");
    }
    return true;
  }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 caracters long"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
]);

export const validateLogin = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const updateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("companyName").notEmpty().withMessage("company name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exists");
      }
    }),
]);
