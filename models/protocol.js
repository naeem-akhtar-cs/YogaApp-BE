import mongoose from "mongoose";

const protocolSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    protocolCode: {
      type: String,
      required: true,
    },
    stripePlanId: {
      type: String,
      required: true,
    },
    searchKeywords: {
      type: Array,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "protocolCategory",
      required: true,
    },
  },
  { collection: "protocol" }
);

const protocol = mongoose.model("protocol", protocolSchema);

export default protocol;
