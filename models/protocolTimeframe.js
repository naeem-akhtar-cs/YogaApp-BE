import mongoose from "mongoose";

const protocolTimeframeSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    fromDuration: {
      type: Number,
      required: true,
    },
    toDuration: {
      type: Number,
      required: true,
    },
    totalDuration: {
      type: Number,
      required: true,
    },
    precautions: {
      type: String,
      required: true,
    },
    progressionCriteria: {
      type: String,
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    protocol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "protocol",
      required: true,
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt:{
      type: Date,
      required: false
    },
  },
  { collection: "protocolTimeframe" }
);

const protocolTimeframe = mongoose.model(
  "protocolTimeframe",
  protocolTimeframeSchema
);

export default protocolTimeframe;
