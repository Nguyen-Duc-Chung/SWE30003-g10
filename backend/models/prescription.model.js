import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
    },
    note: {
      type: String,
      default: "",
    },
    images: [
      {
        type: String,
        required: [true, "At least one image is required"],
      },
    ],
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    status: {
      type: String,
      enum: ["Đang Xử Lý", "Chấp Thuận", "Từ Chối"],
      default: "Đang Xử Lý",
    },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
