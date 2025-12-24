import { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    CustomerUID: { type: String, required: true },
    tableNumber: { type: String, required: true },

    orderItems: [
      {
        itemId: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
        Dishname: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Preparing", "Delivered"],
      default: "Pending",
    },
  },

  { timestamps: true }
);

const Order = model("Order", orderSchema);

export default Order;
