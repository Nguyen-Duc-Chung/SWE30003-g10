import mongoose from "mongoose";

const orderInfoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    deliveryType: {
      type: String,
      enum: ["home", "pickup"],
      default: "home",
    },
  },
  { timestamps: true }
);

const OrderInfo = mongoose.model("OrderInfo", orderInfoSchema);
export default OrderInfo;
