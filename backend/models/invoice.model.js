import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String, // Format: "street - district - province"
      required: true,
    },
    // TOTAL AMOUNT OF MONEY
    totalAmount: {
      type: Number,
      required: true,
    },
    cartItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        totalSpecProductAmount: { type: Number, required: true, },
      },
    ],
    // TOTAL AMOUNT OF MONEY OF EACH PRODUCT
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
