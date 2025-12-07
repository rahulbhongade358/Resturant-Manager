import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { getMenu, postMenu } from "./controllers/menu.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Resturant Server is healthy" });
});

app.post("/uploadmenu", postMenu);
app.get("/menu", getMenu);

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
