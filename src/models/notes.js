import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Baby apna naam dalo"],
  },
  message: {
    type: String,
    required: [true, "Baby kuch message to likho"],
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time
  },
});

const User = mongoose.models.users || mongoose.model("users", notesSchema);

export default User;
