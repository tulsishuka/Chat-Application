import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  online: boolean;
  socketId: string | null;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    online: {
      type: Boolean,
      default: false,
    },

    socketId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);