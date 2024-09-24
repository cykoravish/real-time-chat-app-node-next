// models/Message.ts
import mongoose, { Document, Model, Schema } from "mongoose";

interface IMessage extends Document {
  username: string;
  message: string;
  image_url?: string;
  markedAsRead: boolean;
  createdAt: Date;
}

const MessageSchema: Schema<IMessage> = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
  },
  markedAsRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MessageModel: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
