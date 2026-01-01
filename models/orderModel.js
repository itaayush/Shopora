import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: Object,
        default: null
      },
    ],
    payment: {
      type: Object,
      default: null
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Processed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
