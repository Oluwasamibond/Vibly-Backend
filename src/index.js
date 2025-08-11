import express from "express";
import "dotenv/config"
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";
import { job } from "./lib/cron.js"

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "https://vibly-frontend.vercel.app",
    credentials: true, 
  })
);

app.use(express.json());
app.use(cookieParser());
job.start()

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);


app.get("/", (req, res) => {
  res.send("Server is Active!");
});

app.listen(5000, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB()
});
