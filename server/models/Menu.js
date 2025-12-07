import { model, Schema } from "mongoose";

const menuSchema = new Schema({
  Dishname: { type: String, required: true },
  Dishtype: { type: String, required: true },
  decription: { type: String, required: true },
  price: { type: Number, required: true },
  imageURL: { type: String, required: true },
});

const Menu = model("Menu", menuSchema);
export default Menu;
