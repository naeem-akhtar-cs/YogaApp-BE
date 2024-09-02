import mongoose from "mongoose";

const timeframeExerciseSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    defaultFrequency: {
      type: String,
      required: false,
    },
    frequency: {
      type: String,
      required: false,
    },
    defaultRepetition: {
      type: String,
      required: false,
    },
    repetition: {
      type: String,
      required: false,
    },
    defaultSets: {
      type: Number,
      required: false,
    },
    sets: {
      type: Number,
      required: false,
    },
    defaultWeight: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    videoUrl: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    protocolTimeframe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "protocolTimeframe",
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
  { collection: "timeframeExercise" }
);

const timeframeExercise = mongoose.model(
  "timeframeExercise",
  timeframeExerciseSchema
);

export default timeframeExercise;
