import Event from "../models/eventModel.js";
import User from "../models/userModel.js";
import { getCurrentUser } from "./userControler.js";
import { StatusCodes } from "http-status-codes";
import mongoose, { Mongoose, get } from "mongoose";
import dayjs from "dayjs";
import { body } from "express-validator";

export const getAllEvents = async (req, res) => {
  console.log(req.query);
  const { search, companyName, eventType, sort, userId, eventTitle } =
    req.query;
  const queryObject = {};

  if (userId) {
    queryObject.createdBy = userId;
  }
  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (companyName && companyName !== "all") {
    queryObject.companyName = companyName;
  }
  if (eventTitle && eventTitle !== "all") {
    queryObject.eventTitle = { $regex: eventTitle, $options: "i" };
  }
  if (eventType && eventType !== "ALL") {
    queryObject.eventType = eventType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };
  const sortKey = sortOptions[sort] || sortOptions.newest;

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const events = await Event.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);
  const totalEvents = await Event.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalEvents / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalEvents, numOfPages, currentPage: page, events });
};

export const createEvent = async (req, res) => {
  console.log(req.user);
  if (req.user.role != "ORGANIZER") {
    return res
      .status(400)
      .json({ msg: "you arent autrorized to create event" });
  }

  req.body.createdBy = req.user.userId;

  console.log(req.body);
  const event = await Event.create(req.body);
  res.status(StatusCodes.CREATED).json({ event });
};

export const getEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);

  res.status(StatusCodes.OK).json({ event });
};

export const updateEvent = async (req, res) => {
  const role = req.user.role;
  if (role === "CUSTOMER") {
    return res
      .status(400)
      .json({ msg: "you arent autrorized to update event" });
  }
  const { id } = req.params;
  const event = await Event.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ event });
};

export const deleteEvent = async (req, res) => {
  const role = req.user.role;
  if (role === "CUSTOMER") {
    return res
      .status(400)
      .json({ msg: "you arent autrorized to update event" });
  }
  const { id } = req.params;
  const removedEvent = await Event.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: "event deleted" });
};

export const showStats = async (req, res) => {
  let stats = await Event.aggregate([
    { $group: { _id: "$eventStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: eventStatus, count } = curr;
    acc[eventStatus] = count;
    return acc;
  }, {});

  // Ensure default values for both true and false
  const defaultStats = {
    true: stats.true || 0,
    false: stats.false || 0,
  };

  let monthlyApplications = await Event.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },

    {
      $project: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
      },
    },

    {
      $group: {
        _id: { year: "$year", month: "$month" },
        count: { $sum: 1 },
      },
    },

    {
      $sort: { "_id.year": -1, "_id.month": -1 },
    },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = dayjs()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export const buyTicket = async (req, res) => {
  const role = req.user.role;
  if (role != "CUSTOMER") {
    return res.status(400).json({ msg: "you cant buy an event ticket" });
  }
  const { id } = req.params;
  const { userId } = req.user;
  const { tierNames } = req.body; // Expect an array of tierNames

  // Find the event
  const event = await Event.findById(id);
  if (!event) {
    return res.status(400).json({ msg: "Event not found" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  // Process each tierName

  for (const tierName of tierNames) {
    // Find the tier that matches the tierName
    const tier = event.eventTiers.find((tier) => tier.tierName === tierName);
    if (!tier) {
      return res.status(400).json({ msg: `Tier ${tierName} not found` });
    }

    // Check if the tierLimit is 0
    if (tier.tierLimit === 0) {
      return res
        .status(400)
        .json({ msg: `Tickets for tier ${tierName} are sold out` });
    }

    // Decrease the tierLimit
    tier.tierLimit -= 1;

    const { description, _id, eventTitle } = event;
    const eventPrice = tier.tierPrice;
    const eventTireType = tier.tierName;

    // Create the ticket
    const ticket = {
      description,
      _id,
      eventTitle,
      eventPrice,
      eventTireType,
    };

    // Push the ticket to the user's myTickets array
    user.myTickets.push(ticket);
  }

  await user.save();
  await event.save();

  res.status(StatusCodes.OK).json({ event });
};
