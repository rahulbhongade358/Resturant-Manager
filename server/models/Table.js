import { Schema, model } from "mongoose";

const tableSchema = new Schema(
  {
    tableNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Table = model("Table", tableSchema);
export default Table;
