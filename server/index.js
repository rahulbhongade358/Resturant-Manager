import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { getMenu, postMenu } from "./controllers/menu.js";
import {
  dashboardSummary,
  getCustomerOrder,
  getOrder,
  postOrder,
  updateOrderStatus,
} from "./controllers/order.js";
import {
  getAllUsers,
  postLogin,
  postSignUp,
  getUserbyID,
} from "./controllers/user.js";
import {
  addTable,
  getAllTables,
  toggleTableStatus,
} from "./controllers/tables.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Resturant Server is healthy" });
});

app.post("/uploadmenu", postMenu);
app.get("/menu", getMenu);
app.post("/order", postOrder);
app.get("/allorders", getOrder);
app.get("/order", getCustomerOrder);
app.post("/login", postLogin);
app.post("/signup", postSignUp);
app.get("/allusers", getAllUsers);
app.get("/dashboardsummary", dashboardSummary);
app.put("/updateorderstatus/:orderId", updateOrderStatus);
app.get("/tables", getAllTables);
app.patch("/tables/:tableId/toggle", toggleTableStatus);
app.post("/addtable", addTable);
app.get("/getUserbyID/:UserID", getUserbyID);
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    if (connect) {
      console.log("MongoDB connected successfully ✅");
    }
  } catch (e) {
    console.error(`❌mongoDB connection failed: ${e.message}`);
  }
};

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT} 🚀`);
});
