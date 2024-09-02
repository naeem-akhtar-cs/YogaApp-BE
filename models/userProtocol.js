import mongoose from "mongoose";

const userProtocolSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    protocol: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "protocol",
    },
    activeTimeframeExercise: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "timeframeExercise",
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: false,
    },
  },
  { collection: "userProtocol" }
);

userProtocolSchema.index({ user: 1, protocol: 1, isActive: 1 }, { unique: true });
const userProtocol = mongoose.model("userProtocol", userProtocolSchema);

export default userProtocol;
