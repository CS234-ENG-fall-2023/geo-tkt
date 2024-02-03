import mongoose from "mongoose";
import { USER_TYPE } from "../utils/constants.js";

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  approved: {
    type: Boolean,
    default: false,
  },
  lastName: {
    type: String,
  },
  companyName: {
    type: String,
  },
  role: {
    type: String,
    enum: Object.values(USER_TYPE),
    default: USER_TYPE.CUSTOMER,
  },
  balance: {
    type: Number,
    default: 0,
  },
  

  myTickets: [
    {
      description: String,
      _id: mongoose.Schema.Types.ObjectId,
      eventTitle: String,
      eventPrice: Number,
      eventTireType: String,
    },
  ],
});

UserSchema.methods.toJSON = function () {
  let object = this.toObject();
  delete object.password;
  return object;
};

UserSchema.pre("save", function (next) {
  if (this.role !== "ORGANIZER") {
    this.approved = undefined;
  }
  next();
});

export default mongoose.model("User", UserSchema);
