import mongoose from "mongoose";
import { EVENT_TYPE } from "../utils/constants.js";

const EventTiersSchema = new mongoose.Schema(
  {
    tierName: {
      type: String,
      required: true,
    },
    tierPrice: {
      type: Number,
      required: true,
    },
    tierLimit: {
      type: Number,
      required: true,
    },
  },
  { id: false }
);

const EventSchema = new mongoose.Schema(
  {
    time: {
      type: String,
    },
    eventTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventTiers: [EventTiersSchema],
    companyName: {
      type: String,
      required: true,
    },
    url: String,
    eventStatus: Boolean,
    eventType: {
      type: String,
      enum: Object.values(EVENT_TYPE),
      default: EVENT_TYPE.OTHER,
    },
    availableTickets: Number,
    date: { type: Date },

    eventLocation: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);
