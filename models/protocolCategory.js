import mongoose from "mongoose";

const protocolCategorySchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { collection: "protocolCategory" }
);

const protocolCategory = mongoose.model("protocolCategory", protocolCategorySchema);

export default protocolCategory;
